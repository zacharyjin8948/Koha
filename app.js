const http = require('http');
const fs = require('fs');
const path = require('path');
const request = require('request');

const hostname = '127.0.0.1';
const port = 3000;
const url = 'https://prosentient.intersearch.com.au/cgi-bin/koha/svc/report?id=1&annotated=1';

const server = http.createServer((req, res) => {

    let filePath = '.' + req.url;
    if (filePath == './')
        filePath = './index.html';

    let extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    fs.readFile(filePath, function(err, data) {
        if (err) throw err // Fail if the file can't be read.
        res.writeHead(200, {'Content-Type': contentType});
        res.write(data);
        return res.end();
    });

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


// request(url, (error, response, body)=> {
//     if (!error && response.statusCode === 200) {
//         const fbResponse = JSON.parse(body);
//         console.log("Got a response: ", fbResponse);
//         // res.end(htmlTable(fbResponse));
//     } else {
//         console.log("Got an error: ", error, ", status code: ", response.statusCode);
//     }
// });
// const row = html => `<tr>\n${html}</tr>\n`,
//     heading = object => row(Object.keys(object).reduce((html, heading) => (html + `<th>${heading}</th>`), '')),
//     datarow = object => row(Object.values(object).reduce((html, value) => (html + `<td>${value}</td>`), ''));
//
// function htmlTable(dataList) {
//     return `<table>
//             ${heading(dataList[0])}
//             ${dataList.reduce((html, object) => (html + datarow(object)), '')}
//           </table>`
// }


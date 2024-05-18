import http from 'http';
import { parse } from 'url';
import api_v1 from './controllers/api_v1.js';
import api_v2 from './controllers/api_v2.js';


function routeRequest(req, res) {
    const url = parse(req.url, true);
    const path = url.pathname;


    if (path.startsWith('/first')) {
        api_v1(req, res);
    } 

    else if (path.startsWith('/second')) {
        api_v2(req, res);
    } 

    else if (path === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello from root route.');
    } 

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
}


const server = http.createServer((req, res) => {
    routeRequest(req, res);
});


server.listen(3000, () => {
    console.log('Server started on port 3000 - http://localhost:3000');
});

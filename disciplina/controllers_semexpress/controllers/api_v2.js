function api_v2(req, res) {
    const url = parse(req.url, true);
    const path = url.pathname;

    if (path === '/second') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello from APIv2 root route.');
    } else if (path === '/second/users') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('List of APIv2 users.');
    }
}

export default api_v2;

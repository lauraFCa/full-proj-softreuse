
function api_v1(req, res) {
    const url = parse(req.url, true);
    const path = url.pathname;

    if (path === '/first') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello from APIv1 root route.');
    } else if (path === '/first/users') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('List of APIv1 users.');
    }
}

export default api_v1;

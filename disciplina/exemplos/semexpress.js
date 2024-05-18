import { createServer } from 'http';
import { parse } from 'url';
const PORT = 3000;

let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

const server = createServer((req, res) => {
    const { pathname, query } = parse(req.url, true);

    if (pathname === '/users' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    } else if (pathname.match(/^\/users\/(\d+)$/)) {
        const [, userId] = pathname.match(/^\/users\/(\d+)$/);
        const id = parseInt(userId);

        switch (req.method) {
            case 'GET':
                const user = users.find(user => user.id === id);
                if (user) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(user));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Usuário não encontrado' }));
                }
                break;

            case 'PUT':
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    const updateUser = JSON.parse(body);
                    const index = users.findIndex(user => user.id === id);
                    if (index !== -1) {
                        users[index] = { ...users[index], ...updateUser };
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(users[index]));
                    } else {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Usuário não encontrado' }));
                    }
                });
                break;

            case 'DELETE':
                const index = users.findIndex(user => user.id === id);
                if (index !== -1) {
                    const deletedUser = users.splice(index, 1);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(deletedUser[0]));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Usuário não encontrado' }));
                }
                break;

            default:
                res.writeHead(405, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Método não permitido' }));
        }

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Rota não encontrada' }));
    }
});

server.listen(PORT, () => {
    console.log(`Node.js sem Express iniciado na porta ${PORT}`);
});

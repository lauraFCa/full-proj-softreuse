import express from 'express';

const app = express();

app.use(express.json());


const users = [
    { id: 1, username: 'usuario1', password: 'senha123' },
    { id: 2, username: 'usuario2', password: 'senha456' }
];

function authenticate(username, password) {
    return users.find(user => user.username === username && user.password === password);
}

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password) {
        return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
    }

    const user = authenticate(username, password);

    if (user) {
        return res.json({ message: 'Login bem-sucedido.' });
    } else {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao fazer logout.' });
        }
        res.json({ message: 'Logout bem-sucedido.' });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

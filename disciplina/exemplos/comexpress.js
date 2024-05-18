import express, { json } from 'express';
const app = express();
const PORT = 3000;


let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];


app.use(json());

app.get('/users', (req, res) => {
    res.json(users);
});


app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
    }
});


app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});


app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updateUser = req.body;
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...updateUser };
        res.json(users[index]);
    } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
    }
});


app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        const deletedUser = users.splice(index, 1);
        res.json(deletedUser[0]);
    } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
    }
});


app.use((req, res, next) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});


// Middleware para tratar erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
});


app.listen(PORT, () => {
    console.log(`Servidor Express iniciado na porta ${PORT}`);
});

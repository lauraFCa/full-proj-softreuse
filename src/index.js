import express from 'express';
import { readFileSync } from "fs";
const variables = JSON.parse(readFileSync("variables.json"));

import { db, auth, signupRouter, loginRouter } from './../packages-softreuse/authentication/loginRoutes.js';
import { salesRouter } from './controllers/sales.js';

// Set the secret key for authentication
auth.setSecretKey(variables['secretKey']);

// Set the database parameters
const dbParams = variables['database'];
db.setDbParams(dbParams);


const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/sales', salesRouter);

// Endpoint not found handler
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint não encontrado' });
});

// Error handling middleware
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo deu errado!' });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})

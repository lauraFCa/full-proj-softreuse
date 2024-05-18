# Express.js

Framework de back-end para desenvolvimento web com **Node.js**.  
Oferece recursos robustos, é leve e permite implantação rápida, o que o torna uma excelente escolha para a criação de back-ends escalonáveis, fáceis de manter e de alto desempenho⁴.

Algumas razões pelas quais o Express é tão amplamente adotado:

1. **Sistema de Roteamento Intuitivo**:
   - O Express simplifica o desenvolvimento com o roteamento. É possível definir rotas para diferentes URLs e métodos HTTP de forma intuitiva.
   - Isso facilita a organização e a manutenção do código, além de melhorar a escalabilidade.

2. **Simplicidade e Flexibilidade**:
   - O Express é minimalista e não impõe muitas regras rígidas. Isso permite que os desenvolvedores criem aplicativos da maneira que desejarem.
   - Ele oferece uma estrutura flexível para definir rotas, middlewares e manipuladores de requisições.

3. **Ampla Comunidade e Suporte**:
   - O Express possui uma comunidade ativa e uma grande quantidade de recursos disponíveis.
   - É fácil encontrar tutoriais, exemplos e soluções para problemas comuns.

4. **Performance**:
   - O Node.js, em conjunto com o Express, oferece alta performance e escalabilidade.
   - Ele é ideal para aplicações em tempo real, como chats, streaming e jogos online.

5. **Compatibilidade**
   - ExpressJS funciona com diversos tipos de bancos de dados, sendo necessário apenas a instalação do driver referente

<div style="width: 100%; border: solid 2px darkblue; margin: 20px 0; padding: 5px 0">

6. **Roteamento Intuitivo**:
   - O sistema de roteamento do Express facilita a definição de rotas para diferentes URLs e métodos HTTP.
   - Isso **melhora a organização do código e torna o desenvolvimento mais eficiente**.

7. **Middlewares**:
   - O Express utiliza middlewares para processar requisições antes que elas alcancem as rotas finais.
   - **Isso permite adicionar funcionalidades como autenticação, logging e tratamento de erros de forma modular e reutilizável.**

8. **Extensibilidade e Modularidade**:
   - O Express permite que os desenvolvedores adicionem pacotes e bibliotecas conforme necessário.
   - Ele é compatível com vários módulos e ferramentas de terceiros.

</div>


## Exemplo

Com express é possível criar componentes para serem reutilizados em diversas aplicações.  
Por exemplo, um controller que valida o login/credenciais de um usuário.

``` js
const express = require('express');
const router = express.Router();

const users = [
  { id: 1, username: 'usuario1', password: 'senha123' },
  { id: 2, username: 'usuario2', password: 'senha456' }
];

function authenticate(username, password) {
  return users.find(user => user.username === username && user.password === password);
}

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
  }

  const user = authenticate(username, password);

  if (user) {
    req.session.user = user;
    return res.json({ message: 'Login bem-sucedido.' });
  } else {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }
});


router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao fazer logout.' });
    }
    res.json({ message: 'Logout bem-sucedido.' });
  });
});

module.exports = router;
```


- [Introdução Express/Node no MDN](https://developer.mozilla.org/pt-BR/docs/Learn/Server-side/Express_Nodejs/Introduction)
- [Artigo sobre o Express no Blog da TreinaWeb](https://www.treinaweb.com.br/blog/criando-um-servidor-http-com-express/)
- [Curso de Express no TreinaWeb](https://www.treinaweb.com.br/curso/express-desenvolvendo-aplicacoes-web)
- [Comunidade Revelo: O que é Express?](https://community.revelo.com.br/o-que-e-express/)
- [Artigo sobre o Express no Awari](https://awari.com.br/express-js-simplificando-o-desenvolvimento-de-aplicacoes-web-com-node-js/)
- [Mozila - Server side Express (NodeJs): Introduction](https://developer.mozilla.org/pt-BR/docs/Learn/Server-side/Express_Nodejs/Introduction)
- [Criando um servidor http com Express](https://www.treinaweb.com.br/blog/criando-um-servidor-http-com-express/)
- [Express - Desenvolvendo aplicações web](https://www.treinaweb.com.br/curso/express-desenvolvendo-aplicacoes-web)
- [O que é Express](https://community.revelo.com.br/o-que-e-express/)
- [ExpressJs: Simplificando o desenvolvimento de aplicações web com node js](https://awari.com.br/express-js-simplificando-o-desenvolvimento-de-aplicacoes-web-com-node-js/)
- [ExpressJS - Database integration](https://expressjs.com/en/guide/database-integration.html)
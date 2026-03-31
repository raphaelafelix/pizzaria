require('dotenv').config(); // carrega variáveis de ambiente (.env)

const express = require('express'); // importa o framework Express (servidor web)
const cors    = require('cors'); // permite requisições de diferentes origens (front-end)
const path    = require('path'); 

const app  = express(); // inicializa o app
const PORT = process.env.PORT || 3001; // define porta do servidor

app.use(cors()); // habilita CORS
app.use(express.json()); // permite JSON no body das requisições
app.use(express.static(path.join(__dirname, 'public')));

const { ready } = require('./src/database/sqlite'); // importa conexão com banco (sqlite.js)
const routes    = require('./src/routes/index'); // importa todas as rotas da aplicação

ready.then(() => { // inicia servidor somente após banco estar pronto
  app.use('/api', routes); // usa as rotas da API

  app.get('/teste', (req, res) => {
    res.json({ mensagem: 'API da Pizzaria funcionando!', status: 'online', porta: PORT });
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.listen(PORT, () => {
    console.log('=================================');
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`API: http://localhost:${PORT}/api`);
    console.log(`Front-end: http://localhost:${PORT}`);
    console.log('=================================');
  });
}).catch(err => {
  console.error('Erro ao inicializar banco:', err);
  process.exit(1);
});

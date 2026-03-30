require('dotenv').config(); // Carrega variáveis de ambiente (.env)

const express = require('express'); // Importa o framework Express (servidor web)
const cors    = require('cors'); // Permite requisições de diferentes origens (front-end)
const path    = require('path'); 

const app  = express(); // Inicializa o app
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const { ready } = require('./src/database/sqlite'); // Importa conexão com banco (sqlite.js)
const routes    = require('./src/routes/index'); // Importa todas as rotas da aplicação

ready.then(() => {
  app.use('/api', routes);

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

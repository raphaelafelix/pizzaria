// protege rotas privadas do API

const jwt = require('jsonwebtoken'); // Importa biblioteca JWT

function autenticar(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token      = authHeader && authHeader.split(' ')[1];

  if (!token) { // se não tiver o token... bloqueie o acesso
    return res.status(401).json({ erro: 'Token não fornecido. Faça login.' });
  }

  try {    // verifica validade do token
    const payload  = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario    = payload;  // salva dados do usuário na requisição
    next();
  } catch (erro) {
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
}

module.exports = autenticar;

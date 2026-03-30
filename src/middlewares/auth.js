const jwt = require('jsonwebtoken'); // Importa biblioteca JWT

function autenticar(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token      = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido. Faça login.' });
  }

  try {    // Verifica validade do token
    const payload  = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario    = payload;  // Salva dados do usuário na requisição
    next();
  } catch (erro) {
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
}

module.exports = autenticar;

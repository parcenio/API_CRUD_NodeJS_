const express = require("express");

const app = express();
/**
 * ROTA GET ( Buscar ou Listar Informação)
 */
app.get('/projects', (request, response) => {
  return response.json([
    'Projeto 1', 'Projeto 2'
  ]);
});

app.listen(3333,() => {
  console.log('Back-end Started!🚀');
} );
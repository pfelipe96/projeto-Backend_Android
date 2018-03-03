const express        = require('express'),
    bodyParser     = require('body-parser'),
    expressMongoDb = require('express-mongo-db'),
    multiparty     = require('connect-multiparty'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    usuarioController = require('./controllers/usuario.js');

// inicializa o express
// const app = express();

// inicializa o body parser
app.use(bodyParser.json());

// inicializa mongo e expoe para o express
app.use(expressMongoDb('mongodb://localhost:27017/androidBackend'));

// libera acesso à API de qualquer host/cliente
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.listen(3000, '10.162.110.73',  function() {
  console.log('Acesse o servidor http://10.162.110.73:3000');
});

// server.listen(3000, '10.162.110.73');
//
// server.on('listening', function() {
//     console.log('Express server started on port %s at %s', server.address().port, server.address().address);
// });

app.get('/usuario', usuarioController.listar);
app.post('/usuario/criar', usuarioController.criar);
app.post('/usuario/login', usuarioController.login);
app.get('/usuario/:id', usuarioController.recuperar);

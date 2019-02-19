'use strict'

const express = require('express');
const bodyParser = require('body-parser');
// const hbs = require('express-handlebars');
const app = express();
const api = require('./routes');

//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// use JWT auth to secure the api
//const jwt=require('./jwt')
//app.use(jwt());


// global error handler
//const errorHandler = require('./error-handler');
//app.use(errorHandler);

app.use('/api', api);
// app.get('/login', (req, res) => {
//   res.render('login')
// });
// app.get('/', (req, res) => {
//   res.render('game');
// })

module.exports = app

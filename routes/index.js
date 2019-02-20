'use strict'

const express = require('express');
const gameCtrl = require('../controllers/game');
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const api = express.Router();


api.get('/games', gameCtrl.getGames);
api.get('/games/:gameId', gameCtrl.getGame);
//api.post('/games', auth, gameCtrl.saveGame);
api.post('/games',  gameCtrl.saveGame);
api.put('/games/:gameId',  gameCtrl.updateGame);
api.delete('/games/:gameId', auth, gameCtrl.deleteGame);
api.post('/signup', userCtrl.signUp);
api.post('/signin', userCtrl.signIn);
api.get('/private', (req, res) => {
   res.status(200).send({ message: 'Tienes acceso' })
});

// function authenticate(req, res, next) {
//    userService.authenticate(req.body)
//        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
//        .catch(err => next(err));
// }

// function register(req, res, next) {
//    userService.create(req.body)
//        .then(() => res.json({}))
//        .catch(err => next(err));
// }


module.exports = api

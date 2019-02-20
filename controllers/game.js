'use strict'

const Game = require('../models/games')
const User = require('../models/user')
let controller = {

getGame:  function (req, res) {
  let gameId = req.params.gameId

  Game.findById(gameId, (err, game) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`});
    if (!game) return res.status(404).send({message: `El juego no existe`});

    res.status(200).send( game)
  })
  //. select('titulo, descripcion, poster')
},

getGames: function (req, res) {
  Game.find({}, (err, juegos) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`});
    if (!juegos) return res.status(404).send({message: `No existen juegos`});

    res.json( juegos );
  })
},

saveGame: function (req, res) {
  console.log('POST /api/games');
  console.log('entra en saveGame');
  console.log(req.body);

  let juego = new Game();
  juego.titulo = req.body.titulo;
  juego.año = req.body.año;
  juego.fabricante = req.body.fabricante;
  juego.poster = req.body.poster;
  juego.descripcion = req.body.descripcion
  // ;
  // juego.user = req.body.user;
  // juego.rating = [];


  juego.save((err, gameStored) => {
    if (err) return res.status(500).send({message: `Error al salvar en la base de datos: ${err} `});
    if (!gameStored) return res.status(404).send({message: `Error al salvar el juego ${err} `});
    return res.status(200).send({ game: gameStored });
  })
},

updateGame: function (req, res) {
  let gameId = req.params.gameId;
  let update = req.body;
  console.log(req.body);
  if(gameId == null ) return res.status(500).send('Error- Necesitas una idGame como param para actualizar');

  Game.findByIdAndUpdate(gameId, update, (err, gameUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar el juego: ${err}`});

    res.status(200).send({ game: gameUpdated });
  })
},

rateGame: function (req, res) {
  let gameId = req.params.gameId;
  let newRate = {"user": req.body.user, "rate": req.body.puntos};
  if(gameId == null ) return res.status(500).send('Error- Necesitas un idGame como param para puntuar');
  Game.findOneAndUpdate({gameId}, { $push: { "rates": newRate }}, (err, gameRated) => {
     if(err) res.status(500).send({message: `Error al puntuar el juego: ${err}`});

     res.status(200).send({ game: gameRated });
  })
},

deleteGame: function (req, res) {
  let gameId = req.params.gameId;
  Game.findByIdAndRemove(gameId, function (err) {
      if (err) return res.status(500).send({message: `Error, no se encuentra el juego: ${err}`});
      res.send('Game Deleted successfully!');
  })
}


}

module.exports = controller;

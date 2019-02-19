'use strict'
const mongoose = require('mongoose'),
    Schema   = mongoose.Schema

var Game = new Schema({
//  titulo:    { type: String, unique: true},
  titulo:  String,
  año:     Number ,
  fabricante:  String ,
  descripcion:  String ,
  poster:   String ,
  genero:    { type: String, enum: ['Deportes', 'Fantasía', 'RPG', 'Thriller']
              },
  fechaAlta: { type: Date, default: Date.now() }
  // ,
  // creador:   String          
//  rating:  [{idUser:{ type: Schema.Types.ObjectId, ref: 'UserSchema' }, rate:{type:Number}}]     
});


module.exports = mongoose.model('games', Game);

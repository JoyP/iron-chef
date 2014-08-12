'use strict';

//var Mongo       = require('mongodb');
//var _           = require('lodash');

function Recipe(o){
  this.name         = o.name;
  this.photo        = o.photo;
  this.ingredients  = o.ingredients.split(',').map(function(t){return t.trim();});
  this.instructions = o.instructions;
}

Object.defineProperty(Recipe, 'collection', {
  get: function(){return global.mongodb.collection('recipe');}
});

Recipe.create = function(o, cb){
  var a = new Recipe(o);
  Recipe.collection.save(a, cb);
};

Recipe.all = function(cb){
  Recipe.collection.find().toArray(cb);
};

module.exports = Recipe;

/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Recipe    = require('../../app/models/recipe'),
    dbConnect = require('../../app/lib/mongodb'),
    Mongo     = require('mongodb'),
    cp        = require('child_process'),
    db        = 'template-test';

describe('Recipe', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Recipe object', function(){
      var r = {photo:'http://www.houghfamilyblog.com/wp-content/uploads/2014/05/chocolate-chip-cookies.jpg', name:'Chocolate Chip Cookies', ingredients:('chocolate chips, butter, sugar, brown sugar, eggs, vanilla, baking soda'), instructions:('Combine ingredients, bake for 10 minutes at 375 degrees')},
      p     = new Recipe(r);
      expect(p).to.be.instanceof(Recipe);
      expect(p.photo).to.equal('http://www.houghfamilyblog.com/wp-content/uploads/2014/05/chocolate-chip-cookies.jpg');
      expect(p.name).to.equal('Chocolate Chip Cookies');
      expect(p.ingredients).length.to.be(7);
      expect(p.instructions).to.equal('Combine ingredients, bake for 10 minutes at 375 degrees');
    });
  });

  describe('.create', function(){
    it('should save a new Recipe object', function(done){
      Recipe.create({photo:'http://www.houghfamilyblog.com/wp-content/uploads/2014/05/chocolate-chip-cookies.jpg', name:'Chocolate Chip Cookies', ingredients:('chocolate chips, butter, sugar, brown sugar, eggs, vanilla, baking soda'), instructions:('Combine ingredients, bake for 10 minutes at 375 degrees')}, function(err, recipe){
        expect(recipe._id).to.be.instanceof(Mongo.ObjectID);
        expect(recipe).to.be.instanceof(Recipe);
        expect(recipe.name).to.equal('Chocolate Chip Cookies');
        expect(recipe.photo).to.equal('http://www.houghfamilyblog.com/wp-content/uploads/2014/05/chocolate-chip-cookies.jpg');
        expect(recipe.ingredients).length.to.be(7);
        expect(recipe.instructions).to.equal('Combine ingredients, bake for 10 minutes at 375 degrees');
        done();
      });
    });
  });

  describe('.all', function(){
    it('should get all recipes', function(done){
      Recipe.all(function(err, recipes){
        expect(recipes).to.have.length(1);
        done();
      });
    });
  });
});


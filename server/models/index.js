'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('makersbnb_dev', 'lizziehard', 'null', {
    host: 'localhost',
    dialect: 'postgres',
    port: 3000,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config.json')[env];
var db        = {};
// var models = [
//   'Property',
//   'User'
// ];
// models.forEach(function(model) {
//   module.exports[model] = sequelize.import(__dirname + '/' + model);
// });

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    if (file.slice(-3) !== '.js') return;
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

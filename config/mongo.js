var router = require('express').Router(),
    fs = require('fs'),
    path = require('path'),
    validFileTypes = ['js'];

function Mongo() {
  var connections = {
    development: {
      uri: 'localhost',
      port: '27017',
      db: 'movierating',
      credentials: {
        user: "",
        pass: "",
        auth: {
          authdb: 'admin'
        }
      }
    },
    production: {
      uri: 'localhost',
      port: '27017',
      db: 'movierating',
      credentials: {
        user: "joshuawarejko",
        pass: "Thebled13",
        auth: {
          authdb: 'admin'
        }
      }
    }
  }
  this.connection = connections[app.get('env')];
}

module.exports = function(app) {
  return new Mongo(app);
};
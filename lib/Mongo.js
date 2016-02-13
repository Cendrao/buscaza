var mongojs = require('mongojs');

/* istanbul ignore next */
var Mongo = (function() {
  'use strict';
  var _connection = function(env) {
    var username = env.MONGO_USERNAME || '',
    password = env.MONGO_PASSWORD || '',
    server   = env.MONGO_SERVER   || '192.168.1.5',
    port     = env.MONGO_PORT     || '27017',
    database = env.MONGO_DATABASE || 'buscaza',

    auth = username ? username + ':' + password + '@' : '';

    return 'mongodb://' + auth + server + ':' + port + '/' + database;
  };

  var db;
  var module = {
    _init: function() {
      var url = _connection(process.env);

      console.log(url);

      db = mongojs(url);
     // db.on('error', function(err) {

    //  });
},

findOne: function( collection, query, callback) {
  db.collection(collection).findOne(query, callback);
},

insert: function( collection,data, callback) {


 db.collection(collection).insert(data, callback);

}
}
module._init();

return module;
}());

module.exports = Mongo;
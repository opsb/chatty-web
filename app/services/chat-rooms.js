import Ember from 'ember';
import RethinkdbWebsocketClient from 'npm:rethinkdb-websocket-client';
let r = RethinkdbWebsocketClient.rethinkdb;
let {Promise, resolve} = Ember.RSVP;

let options = {
  host: 'localhost',       // hostname of the websocket server
  port: 8000,              // port number of the websocket server
  path: '/',               // HTTP path to websocket route
  wsProtocols: ['binary'], // sub-protocols for websocket, required for websockify
  secure: false,           // set true to use secure TLS websockets
  db: 'test',              // default database, passed to rethinkdb.connect
  simulatedLatencyMs: 100, // wait 100ms before sending each message (optional)
};

export default Ember.Service.extend({
  find(id) {
    return this._run(r.table('chat_rooms').get(id));
  },


  add(name) {
    return this._run(r.table('chat_rooms').insert({name: name}));
  },


  all() {
    var _this = this;

    return _this._run(r.table('chat_rooms')).then(function(cursor){
      return _this._extractArray(cursor).then(function(messages){
        _this._streamInto(messages);
        return messages;
      });
    });
  },


  _streamInto(messages) {
    this._run(r.table('chat_rooms').changes()).then(function(cursor){
      cursor.each(function(err, row){
        console.log(row);
        messages.pushObject(row.new_val);
      });
    });
  },


  _extractArray(cursor) {
    return new Promise(function(resolve, reject){
      cursor.toArray(function(err, messages){
        if(err) reject(err);
        resolve(messages);
      });
    });
  },


  _run(query) {
    return this._connection().then(function(conn){
      return query.run(conn);
    });
  },


  _connection() {
    var existingConnection = this.get('__connection__');

    if(existingConnection) return resolve(existingConnection);

    return new Promise((resolve) => {
      RethinkdbWebsocketClient.connect(options).then((conn) => {
        this.set('__connection__', conn);
        resolve(conn);
      });
    });
  }
});

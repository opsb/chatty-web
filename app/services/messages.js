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

  where(criteria) {
    let _this = this;

    return _this._run(r.table('messages').filter(criteria).orderBy('createdAt')).then(function(cursor){
      return _this._extractArray(cursor).then(function(messages){
        _this._streamInto(messages, criteria);
        return messages;
      });
    });
  },

  stream() {
    var messages = [];

    this._streamInto(messages);

    return messages;
  },

  add(body, chatRoomId) {
    return this._run(r.table('messages').insert({body: body, chatRoomId: chatRoomId, createdAt: new Date()}));
  },

  _streamInto(messages, criteria) {
    this._run(r.table('messages').filter(criteria).changes({includeStates: true})).then(function(cursor){
      cursor.each(function(err, row){
        if(!row.state) {
          messages.pushObject(row.new_val);
        }
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

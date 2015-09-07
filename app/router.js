import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('chat-rooms', function(){
    this.route('chat-room', {path: 'chat-room/:chat_room_id'}, function(){
    });
  });
});

export default Router;

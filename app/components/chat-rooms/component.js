import Ember from 'ember';

let service = Ember.inject.service;
let alias = Ember.computed.alias;

export default Ember.Component.extend({
  chatRooms: service(),
  all: null,

  setup: Ember.on('init', function() {
    this.get('chatRooms').all().then(all => {
      this.set('all', all);
    });
  }),

  actions: {
    addChatRoom(name) {
      this.get('chatRooms').add(name);
    }
  }
});

import Ember from 'ember';

let service = Ember.inject.service;
let alias = Ember.computed.alias;

export default Ember.Component.extend({
  chatRoomsService: service('chatRooms'),
  chatRooms: null,

  actions: {
    addChatRoom(name) {
      this.get('chatRoomsService').add(name);
    }
  }
});

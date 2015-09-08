import Ember from 'ember';

export default Ember.Route.extend({
  chatRoomsService: Ember.inject.service('chatRooms'),

  model(params) {
    return this.get('chatRoomsService').find(params['chat_room_id']);
  }
});

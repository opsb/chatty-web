import Ember from 'ember';

export default Ember.Route.extend({
  chatRooms: Ember.inject.service(),

  model() {
    return this.get('chatRooms').all();
  }
});

import Ember from 'ember';

export default Ember.Route.extend({
  messages: Ember.inject.service('messages'),

  model() {
    return this.get('messages').stream();
  },

  actions: {
    addMessage(body) {
      this.get('messages').add(body);
      this.set('controller.message', null);
    }
  }
});

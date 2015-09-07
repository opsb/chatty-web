import Ember from 'ember';

export default Ember.Route.extend({
  messages: Ember.inject.service('messages'),

  model() {
    return this.get('messages').findAll();
  },

  actions: {
    addMessage(body) {
      this.get('messages').add(body);
      this.set('controller.message', null);
    }
  }
});

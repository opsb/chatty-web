import Ember from 'ember';

export default Ember.Component.extend({
  message: null,
  classNames: ['text-input'],

  actions: {
    addMessage: function(message){
      this.set('message', null);
      this.sendAction('onAdd', message);
    }
  }
});

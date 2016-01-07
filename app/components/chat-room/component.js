import Ember from 'ember';

let {
  alias
} = Ember.computed;

let computed = Ember.computed;

export default Ember.Component.extend({

  messagesService: Ember.inject.service('messages'),

  /* attrs */
  chatRoom: null,

  actions: {
    addMessage(text) {
      this.get('messagesService').add(text, this.get('chatRoom'));
    }
  }

});

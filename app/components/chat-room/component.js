import Ember from 'ember';

let {
  alias
} = Ember.computed;

let computed = Ember.computed;

export default Ember.Component.extend({

  messagesService: Ember.inject.service('messages'),

  /* attrs */
  chatRoom: null,

  didReceiveAttrs: function(){
    this.set('messages', null);
    this.get('messagesService').where({
      chatRoomId: this.get('chatRoom.id')
    }).then(messages => {
      this.set('messages', messages);
    });
  },

  actions: {
    addMessage(text) {
      console.log('adding', text, this.get('chatRoom.id'));
      this.get('messagesService').add(text, this.get('chatRoom.id'));
    }
  }

});

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
    this._super();
    console.log('chat room', this.get('chatRoom.name'));
    this.set('messages', null);
    this.get('messagesService').where({
      chatRoomId: this.get('chatRoom.id')
    }).then(messages => {
      this.set('messages', messages);
    });
  },

  actions: {
    addMessage(text) {
      console.log('adding', this.get('chatRoom.name'), '=>', text);
      this.get('messagesService').add(text, this.get('chatRoom.id'));
    }
  }

});

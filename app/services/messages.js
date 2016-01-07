import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Service.extend({
  store: service(),

  add(body, chatRoom) {
    return this.get('store').addRecord({ type: 'message', body: body, chatRoom: chatRoom });
  }
});

import Ember from 'ember';
import { queryExpression as oqe } from 'orbit-common/oql/expressions';

const { service } = Ember.inject;

export default Ember.Service.extend({
  store: service(),

  find(id) {
    return this.get('store').findRecord('chat-room', id);
  },

  add(name) {
    return this.get('store').addRecord({ type: 'chat-room', name: name });
  },

  all() {
    return this.get('store.cache').liveQuery({
      oql: oqe('recordsOfType', 'chat-room')
    });
  }
});

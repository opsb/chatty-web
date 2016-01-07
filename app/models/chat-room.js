import Ember from 'ember';
import Model from 'ember-orbit/model';
import attr from 'ember-orbit/fields/attr';
import hasMany from 'ember-orbit/fields/has-many';

export default Model.extend({
  name: attr(),
  messages: hasMany('message', { inverse: 'chatRoom' })
});

import Model from 'ember-orbit/model';
import attr from 'ember-orbit/fields/attr';
import hasOne from 'ember-orbit/fields/has-one';

export default Model.extend({
  body: attr(),
  chatRoom: hasOne('chat-room', { inverse: 'messages' })
});

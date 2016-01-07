import Orbit from 'orbit/main';
import OrbitSchema from 'orbit-common/schema';
import OrbitStore from 'orbit-common/store';
import Store from 'ember-orbit/store';

Orbit.Promise = Ember.RSVP.Promise;

const OrbitStoreFactory = {
  create() {
    const orbitSchema = new OrbitSchema();
    const orbitStore = new OrbitStore({ schema: orbitSchema });
    return orbitStore;
  }
}

export default {
  name: 'ember-orbit',

  initialize: function(registry) {
    registry.register('service:orbitStore', OrbitStoreFactory);
    registry.register('service:store', Store);

    var inject = registry.inject || registry.injection;
    inject.call(registry, 'controller', 'store', 'service:store');
    inject.call(registry, 'route', 'store', 'service:store');
  },
};

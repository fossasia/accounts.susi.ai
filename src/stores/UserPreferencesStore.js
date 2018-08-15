import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import ChatConstants from '../constants/ChatConstants';
import { EventEmitter } from 'events';
import { urls } from '../Utils';

let ActionTypes = ChatConstants.ActionTypes;
let CHANGE_EVENT = 'change';

let _defaults = {
  Theme: 'light',
  Server: `${urls.API_URL}`,
  StandardServer: `${urls.API_URL}`,
  avatarType: 'default',
};

let UserPreferencesStore = {
  ...EventEmitter.prototype,

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  getPreferences() {
    return _defaults;
  },

  getTheme() {
    return _defaults.Theme;
  },

  getAvatarType() {
    return _defaults.avatarType;
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
};

UserPreferencesStore.dispatchToken = ChatAppDispatcher.register(action => {
  switch (action.type) {
    case ActionTypes.THEME_CHANGED: {
      _defaults.Theme = action.theme;
      UserPreferencesStore.emitChange();
      break;
    }
    case ActionTypes.SERVER_CHANGED: {
      _defaults.Server = action.server;
      UserPreferencesStore.emitChange();
      break;
    }
    case ActionTypes.AVATAR_TYPE_CHANGED: {
      _defaults.avatarType = action.avatarType;
      UserPreferencesStore.emitChange();
      break;
    }
    default: {
      // do nothing
    }
  }
});

export default UserPreferencesStore;

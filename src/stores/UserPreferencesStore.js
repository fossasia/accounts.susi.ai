import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import ChatConstants from '../constants/ChatConstants';
import { EventEmitter } from 'events';
import { urls } from '../Utils';

let ActionTypes = ChatConstants.ActionTypes;
let CHANGE_EVENT = 'change';

let _defaults = {
  Theme: 'light',
  ThemeValues: '',
  BackgroundImage: '',
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

  getThemeValues() {
    return _defaults.ThemeValues;
  },

  getBackgroundImage() {
    return _defaults.BackgroundImage;
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
    case ActionTypes.SETTINGS_CHANGED: {
      let settings = action.settings;
      if (settings.hasOwnProperty('theme')) {
        _defaults.Theme = settings.theme;
      }
      if (settings.hasOwnProperty('previewTheme')) {
        _defaults.PreviewTheme = settings.previewTheme;
      }
      if (settings.hasOwnProperty('backgroundImage')) {
        _defaults.BackgroundImage = settings.backgroundImage;
      }
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

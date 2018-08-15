import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import ChatConstants from '../constants/ChatConstants';
import * as Actions from './API.actions';

let ActionTypes = ChatConstants.ActionTypes;

export function serverChanged(server) {
  ChatAppDispatcher.dispatch({
    type: ActionTypes.SERVER_CHANGED,
    server,
  });
}

export function themeChanged(theme) {
  ChatAppDispatcher.dispatch({
    type: ActionTypes.THEME_CHANGED,
    theme,
  });
}

export function avatarTypeChanged(avatarType) {
  ChatAppDispatcher.dispatch({
    type: ActionTypes.AVATAR_TYPE_CHANGED,
    avatarType,
  });
}

export function settingsChanged(settings) {
  ChatAppDispatcher.dispatch({
    type: ActionTypes.SETTINGS_CHANGED,
    settings,
  });
  Actions.pushSettingsToServer(settings);
}

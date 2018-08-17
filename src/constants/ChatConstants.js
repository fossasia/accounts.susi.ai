import keyMirror from 'keymirror';

export default {
  ActionTypes: keyMirror({
    THEME_CHANGED: null,
    SERVER_CHANGED: null,
    AVATAR_TYPE_CHANGED: null,
  }),
  standardBlue: '#4285f4',
  thumbStyle: { backgroundColor: 'rgb(245, 245, 245)' },
  trackStyle: { backgroundColor: 'rgb(189, 189, 189)' },
  thumbSwitchedStyle: { backgroundColor: 'rgb(89, 177, 252)' },
  trackSwitchedStyle: { backgroundColor: 'rgb(66, 133, 244)' },
};

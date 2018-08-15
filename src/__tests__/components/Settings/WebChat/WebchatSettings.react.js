import React from 'react';
// eslint-disable-next-line
import WebChatSettings from '../../../../components/Settings/WebChat/WebchatSettings.react';
import { shallow } from 'enzyme';

describe('<WebChatSettings />', () => {
  it('render WebChatSettings without crashing', () => {
    shallow(<WebChatSettings />);
  });
});

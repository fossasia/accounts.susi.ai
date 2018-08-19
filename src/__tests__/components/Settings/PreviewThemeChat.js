import React from 'react';
import PreviewThemeChat from '../../../components/Settings/PreviewThemeChat';
import { shallow } from 'enzyme';

describe('<PreviewThemeChat />', () => {
  it('render PreviewThemeChat without crashing', () => {
    shallow(<PreviewThemeChat />);
  });
});

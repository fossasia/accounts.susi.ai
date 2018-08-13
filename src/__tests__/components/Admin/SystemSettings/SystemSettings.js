import React from 'react';
// eslint-disable-next-line
import SystemSettings from '../../../../components/Admin/SystemSettings/SystemSettings.js';
import { shallow } from 'enzyme';

describe('<SystemSettings />', () => {
  it('render SystemSettings without crashing', () => {
    shallow(<SystemSettings />);
  });
});

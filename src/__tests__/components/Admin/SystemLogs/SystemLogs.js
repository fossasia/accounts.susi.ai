import React from 'react';
import SystemLogs from '../../../../components/Admin/SystemLogs/SystemLogs.js';
import { shallow } from 'enzyme';

describe('<SystemLogs />', () => {
  it('render SystemLogs without crashing', () => {
    shallow(<SystemLogs />);
  });
});

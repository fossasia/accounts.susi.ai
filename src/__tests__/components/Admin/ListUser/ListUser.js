import React from 'react';
import ListUser from '../../../../components/Admin/ListUser/ListUser.js';
import { shallow } from 'enzyme';

describe('<ListUser />', () => {
  it('render ListUser without crashing', () => {
    shallow(<ListUser />);
  });
});

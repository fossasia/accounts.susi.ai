import React from 'react';
import Admin from '../../../components/Admin//Admin.js';
import { shallow } from 'enzyme';

describe('<Admin />', () => {
  it('render Admin without crashing', () => {
    shallow(<Admin />);
  });
});

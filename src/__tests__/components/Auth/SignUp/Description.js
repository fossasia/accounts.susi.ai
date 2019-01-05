import React from 'react';
import Description from '../../../../components/Auth/SignUp/Description.js';
import { shallow } from 'enzyme';

describe('<Description />', () => {
  it('render Description without crashing', () => {
    shallow(<Description />);
  });
});

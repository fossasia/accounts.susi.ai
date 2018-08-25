import React from 'react';
import ListSkills from '../../../../components/Admin/ListSkills/ListSkills.js';
import { shallow } from 'enzyme';

describe('<ListSkills />', () => {
  it('render ListSkills without crashing', () => {
    shallow(<ListSkills />);
  });
});

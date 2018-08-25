import React from 'react';
import CircleImage from '../../../components/CircleImage/CircleImage.js';
import { shallow } from 'enzyme';

describe('<CircleImage />', () => {
  it('render CircleImage without crashing', () => {
    shallow(<CircleImage />);
  });
});

import React from 'react';
import TableComplex from '../../../components/TableComplex/TableComplex.react';
import { shallow } from 'enzyme';

describe('<TableComplex />', () => {
  it('render TableComplex without crashing', () => {
    shallow(<TableComplex />);
  });
});

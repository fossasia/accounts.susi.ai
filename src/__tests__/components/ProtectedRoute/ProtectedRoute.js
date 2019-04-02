import React from 'react';
import ProtectedRoute from '../../../components/ProtectedRoute/ProtectedRoute';
import { shallow } from 'enzyme';

describe('<ProtectedRoute />', () => {
  it('render ProtectedRoute without crashing', () => {
    shallow(<ProtectedRoute />);
  });
});

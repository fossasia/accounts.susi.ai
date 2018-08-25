import React from 'react';
// eslint-disable-next-line
import ResetPassword from '../../../../components/Auth/ResetPassword/ResetPassword.react';
import { shallow } from 'enzyme';

describe('<ResetPassword />', () => {
  it('render ResetPassword without crashing', () => {
    shallow(<ResetPassword />);
  });
});

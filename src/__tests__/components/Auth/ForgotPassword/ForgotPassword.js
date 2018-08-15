import React from 'react';
// eslint-disable-next-line
import ForgotPassword from '../../../../components/Auth/ForgotPassword/ForgotPassword.react';
import { shallow } from 'enzyme';

describe('<ForgotPassword />', () => {
  it('render ForgotPassword without crashing', () => {
    shallow(<ForgotPassword />);
  });
});

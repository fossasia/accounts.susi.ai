import React from 'react';
// eslint-disable-next-line
import ChangePassword from '../../../../components/Auth/ChangePassword/ChangePassword.react';
import { shallow } from 'enzyme';

describe('<ChangePassword />', () => {
  it('render ChangePassword without crashing', () => {
    shallow(<ChangePassword />);
  });
});

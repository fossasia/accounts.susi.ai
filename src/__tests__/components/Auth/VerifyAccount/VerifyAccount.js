import React from 'react';
// eslint-disable-next-line
import VerifyAccount from '../../../../components/Auth/VerifyAccount/VerifyAccount.react';
import { shallow } from 'enzyme';

describe('<VerifyAccount />', () => {
  it('render VerifyAccount without crashing', () => {
    shallow(<VerifyAccount />);
  });
});

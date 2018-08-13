import React from 'react';
// eslint-disable-next-line
import DeleteAccount from '../../../../components/Auth/DeleteAccount/DeleteAccount.react';
import { shallow } from 'enzyme';

describe('<DeleteAccount />', () => {
  it('render DeleteAccount without crashing', () => {
    shallow(<DeleteAccount />);
  });
});

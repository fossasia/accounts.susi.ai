import React from 'react';
// eslint-disable-next-line
import RemoveDeviceDialog from '../../../components/TableComplex/RemoveDeviceDialog.react';
import { shallow } from 'enzyme';

describe('<RemoveDeviceDialog />', () => {
  it('render RemoveDeviceDialog without crashing', () => {
    shallow(<RemoveDeviceDialog />);
  });
});

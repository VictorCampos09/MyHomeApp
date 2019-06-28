import React from 'react';
import { shallow } from 'enzyme';

import RodapeCorporativo from './RodapeCorporativo';

it('renders correctly', () => {
  const screen = shallow(<RodapeCorporativo />);
  expect(screen).toMatchSnapshot();
});

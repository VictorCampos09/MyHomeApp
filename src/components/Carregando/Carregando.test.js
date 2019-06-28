import React from 'react';
import { shallow } from 'enzyme';

import Carregando from './Carregando';

it('renders correctly', () => {
  const screen = shallow(<Carregando />);
  expect(screen).toMatchSnapshot();
});

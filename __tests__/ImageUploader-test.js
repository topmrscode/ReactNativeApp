import React from 'react';
import ImageUploader from '../src/components/images/ImageUploader';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';


// ---------------------
//  RENDU DES DONNEES  
// ---------------------
// creer un snapshot de mon rendu pour mon component Feed pour m assurer
// que chaque fois que je lance mon rendu il match bien avec celui d'avant 

Enzyme.configure({ adapter: new Adapter()});
test('renders correctly', async () => {

  const wrapper = await (shallow(<ImageUploader  />));

  const tree = renderer.create(wrapper).toJSON();
  expect(tree).toMatchSnapshot();
  wrapper.instance().ShowPicker();
});
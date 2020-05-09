import React from 'react';
import FeedScreen from '../src/components/PicturesFeed';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

// CONFIGURER LE TEST ------
jest.disableAutomock();

// mocker axios
jest.mock("axios");
// mocker le module dans le fichier correpondant 
jest.mock('../src/api/Image.js', () => ({
  // je donne la fonction du componentWillMount et ses parametres
  DisplayFeed: (section, sort) => {
    // retourner ce que doit renvoyer la fonction
    return (
      new Promise((resolve, reject) => {
        var data = {
          data: [
          {
            images: [
              {
                type: "image/jpeg",
                id: "id_first_img_1",
                link: "http://www.google.com"
              }
            ],
            id: 'id_first',
          },
          {
            images: [
              {
                type: "image/jpeg",
                id: "id_second_img_1",
                link: "http://www.google.com"
              }
            ],
            id: 'id_second',
          },
          {
            images: [
              {
                type: "image/png",
                id: "id_third_img_1",
                link: "http://www.google.com"
              }
            ],
            id: 'id_third',
          },
          {
            images: [
              {
                type: "video",
                id: "id_error_img_1",
                link: "http://www.google.com"
              }
            ],
            id: 'id_error',
          }
        ]}
        resolve(data);
      })
  )}
}));

// Cette ligne sert uniquement a remplacer notre react-native comme on ne le lance pas, pour pouvoir charger le component
Enzyme.configure({ adapter: new Adapter()});

// TESTER ------
test('renders correctly', async () => {
  // nous générons l’instance du composant en utilisant « shallow », 
  const wrapper = await (shallow(<FeedScreen  />));

  // "j attend que mon state image (un tableau) fasse une longueur de trois"
  expect(wrapper.state('images')).toHaveLength(3);
  // "jattend que le champ source.uri a l index 0 de mon tableau image correpsonent ce cette url"
  expect(wrapper.state('images')[0].source.uri).toEqual("https://i.imgur.com/id_first_img_1.jpg");

  await wrapper.instance().filterSearch("top");
  
});


import React from 'react';
import MyGalleryScreen from '../src/components/images/MyGallery';
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
  GetAccountImages: (section, sort) => {
    // retourner ce que doit renvoyer la fonction
    return (
      new Promise((resolve, reject) => {
        var data = {
          "data": [
            {"account_id": 129569395, "account_url": "MrsCode", "ad_type": 0, "ad_url": "", "animated": false, "bandwidth": 316150, "caption": "", "datetime": 1588619454, "deletehash": "qYfIv65DjqNL6Oh", "description": null, "edited": "0", "favorite": false, "has_sound": false, "height": 1280, "id": "AlZJqZQ", "in_gallery": false, "in_most_viral": false, "is_ad": false, "link": "https://i.imgur.com/AlZJqZQ.jpg", "name": null, "nsfw": null, "section": null, "size": 158075, "source": {"uri": "https://i.imgur.com/AlZJqZQ.jpg"}, "tags": [], "title": null, "type": "image/jpeg", "views": 2, "vote": null, "width": 960}, 
            {"account_id": 129569395, "account_url": "MrsCode", "ad_type": 0, "ad_url": "", "animated": false, "bandwidth": 316150, "caption": "", "datetime": 1588585048, "deletehash": "ZmFpjdk7kcYIBaN", "description": null, "edited": "0", "favorite": false, "has_sound": false, "height": 1280, "id": "8gw29wG", "in_gallery": false, "in_most_viral": false, "is_ad": false, "link": "https://i.imgur.com/8gw29wG.jpg", "name": null, "nsfw": null, "section": null, "size": 158075, "source": {"uri": "https://i.imgur.com/8gw29wG.jpg"}, "tags": [], "title": null, "type": "image/jpeg", "views": 2, "vote": null, "width": 960}
          ]
        }
        resolve(data);
      })
  )}
}));

// Cette ligne sert uniquement a remplacer notre react-native comme on ne le lance pas, pour pouvoir charger le component
Enzyme.configure({ adapter: new Adapter()});

// TESTER ------
test('renders correctly', async () => {
  // Creer le component a tester
  const wrapper = await (shallow(<MyGalleryScreen  />));

  // "j attend que mon state image (un tableau) fasse une longueur de trois"
  expect(wrapper.state('images')).toHaveLength(2);
  expect(wrapper.state('images')[0].source.uri).toEqual("https://i.imgur.com/AlZJqZQ.jpg");  // "jattend que le champ source.uri a l index 0 de mon tableau image correpsonent ce cette url"
    // expect(wrapper.state('images')).toHaveLength(3);

});


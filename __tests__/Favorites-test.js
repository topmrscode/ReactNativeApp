import React from 'react';
import FavoritesScreen from '../src/components/images/Favorites';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { Button } from 'react-native-elements';

// CONFIGURER LE TEST ------
jest.disableAutomock();

// mocker axios
jest.mock("axios");
// mocker le module dans le fichier correpondant 
jest.mock('../src/api/Image.js', () => ({
  // je donne la fonction du componentWillMount et ses parametres
  GetFavoriteImages: (section, sort) => {
    // retourner ce que doit renvoyer la fonction
    return (
      new Promise((resolve, reject) => {
        var data = {
          "data": [
            {"account_id": 0, "account_url": "", "animated": false, "comment_count": 0, "cover": "iGxGSwi", "cover_height": 686, "cover_width": 700, "datetime": 1588438701, "description": "", "downs": 0, "favorite": true, "favorite_count": 0, "has_sound": false, "height": 686, "id": "iGxGSwi", "images": null, "images_count": 0, "in_gallery": false, "in_most_viral": false, "is_album": false, "link": "https://i.imgur.com/iGxGSwi.jpg", "nsfw": false, "points": 0, "privacy": "2", "score": 0, "section": null, "size": 108914, "tags": null, "title": "", "topic": "", "topic_id": "", "type": "image/jpeg", "ups": 0, "views": 89174, "vote": "", "width": 700}, 
            {"account_id": 0, "account_url": "", "animated": false, "comment_count": 0, "cover": "MgxivgY", "cover_height": 916, "cover_width": 564, "datetime": 1588451983, "description": "", "downs": 0, "favorite": true, "favorite_count": 0, "has_sound": false, "height": 916, "id": "MgxivgY", "images": null, "images_count": 0, "in_gallery": false, "in_most_viral": false, "is_album": false, "link": "https://i.imgur.com/MgxivgY.jpg", "nsfw": false, "points": 0, "privacy": "2", "score": 0, "section": null, "size": 94814, "tags": null, "title": "", "topic": "", "topic_id": "", "type": "image/jpeg", "ups": 0, "views": 2838, "vote": "", "width": 564}, 
            {"account_id": 0, "account_url": "", "animated": false, "comment_count": 0, "cover": "bGPejzQ", "cover_height": 720, "cover_width": 720, "datetime": 1588437391, "description": "", "downs": 0, "favorite": true, "favorite_count": 0, "has_sound": false, "height": 720, "id": "bGPejzQ", "images": null, "images_count": 0, "in_gallery": false, "in_most_viral": false, "is_album": false, "link": "https://i.imgur.com/bGPejzQ.jpg", "nsfw": false, "points": 0, "privacy": "2", "score": 0, "section": null, "size": 53926, "tags": null, "title": "", "topic": "", "topic_id": "", "type": "image/jpeg", "ups": 0, "views": 125904, "vote": "", "width": 720}, 
            {"account_id": 0, "account_url": "", "animated": false, "comment_count": 522, "cover": "tAui2H7", "cover_height": 960, "cover_width": 662, "datetime": 1457781541, "description": "", "downs": 247, "favorite": true, "favorite_count": 4102, "has_sound": false, "height": 960, "id": "tAui2H7", "images": null, "images_count": 0, "in_gallery": true, "in_most_viral": false, "is_album": false, "link": "https://imgur.com/gallery/tAui2H7", "nsfw": false, "points": 17332, "privacy": "0", "score": 0, "section": null, "size": 82383, "tags": null, "title": "Tom Hardy brought his dog to movie awards", "topic": "", "topic_id": "", "type": "image/jpeg", "ups": 17579, "views": 44856, "vote": "", "width": 662}, 
            {"account_id": 0, "account_url": "", "animated": false, "comment_count": 0, "cover": "dyoFIuZ", "cover_height": 750, "cover_width": 750, "datetime": 1588391281, "description": "", "downs": 0, "favorite": true, "favorite_count": 0, "has_sound": false, "height": 750, "id": "dyoFIuZ", "images": null, "images_count": 0, "in_gallery": false, "in_most_viral": false, "is_album": false, "link": "https://i.imgur.com/dyoFIuZ.jpg", "nsfw": false, "points": 0, "privacy": "2", "score": 0, "section": null, "size": 32636, "tags": null, "title": "", "topic": "", "topic_id": "", "type": "image/jpeg", "ups": 0, "views": 78505, "vote": "", "width": 750},
            {"account_id": 0, "account_url": "", "animated": false, "comment_count": 0, "cover": "wZQmFUR", "cover_height": 2340, "cover_width": 1080, "datetime": 1588387212, "description": "", "downs": 0, "favorite": true, "favorite_count": 0, "has_sound": false, "height": 2340, "id": "wZQmFUR", "images": null, "images_count": 0, "in_gallery": false, "in_most_viral": false, "is_album": false, "link": "https://i.imgur.com/wZQmFUR.jpg", "nsfw": false, "points": 0, "privacy": "2", "score": 0, "section": null, "size": 797976, "tags": null, "title": "", "topic": "", "topic_id": "", "type": "image/jpeg", "ups": 0, "views": 80753, "vote": "", "width": 1080}, 
            {"account_id": 0, "account_url": "", "animated": false, "comment_count": 0, "cover": "HMGmYI8", "cover_height": 500, "cover_width": 500, "datetime": 1588364636, "description": "", "downs": 0, "favorite": true, "favorite_count": 0, "has_sound": false, "height": 500, "id": "HMGmYI8", "images": null, "images_count": 0, "in_gallery": false, "in_most_viral": false, "is_album": false, "link": "https://i.imgur.com/HMGmYI8.jpg", "nsfw": false, "points": 0, "privacy": "2", "score": 0, "section": null, "size": 59485, "tags": null, "title": "", "topic": "", "topic_id": "", "type": "image/jpeg", "ups": 0, "views": 68589, "vote": "", "width": 500}, 
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
  const wrapper = await (shallow(<FavoritesScreen  />));


  // "j attend que mon state image (un tableau) fasse une longueur de trois"
  expect(wrapper.state('images')).toHaveLength(7);
  expect(wrapper.state('images')[3].source.uri).toEqual("https://i.imgur.com/tAui2H7.jpg");  // "jattend que le champ source.uri a l index 0 de mon tableau image correpsonent ce cette url"
  expect(wrapper.state('images')[0].favorite).toBe(true); 

});


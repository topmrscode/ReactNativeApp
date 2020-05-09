import React from 'react';
import SearchScreen from '../src/components/search/Search';
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
  GetGalleryFromApi: (section, sort) => {
    // retourner ce que doit renvoyer la fonction
    return (
      new Promise((resolve, reject) => {
        var data = {
          "data": [
            {"account_id": 23590403, "account_url": "Shivou", "ad_config": [Object], "ad_type": 0, "ad_url": "", "animated": true, "bandwidth": 19009032161696, "comment_count": 586, "datetime": 1477830612, "description": null, "downs": 264, "edited": 0, "favorite": false, "favorite_count": 12281, "gifv": "https://i.imgur.com/jxWYgnq.gifv", "has_sound": false, "height": 720, "hls": "https://i.imgur.com/jxWYgnq.m3u8", "id": "jxWYgnq", "in_gallery": true, "in_most_viral": true, "is_ad": false, "is_album": false, "link": "http://i.imgur.com/jxWYgnqh.gif", "looping": true, "mp4": "https://i.imgur.com/jxWYgnq.mp4", "mp4_size": 2306666, "nsfw": false, "points": 30463, "score": 30668, "section": "aww", "size": 46217401, "tags": [Array], "title": "Store owners dog does this to all customers", "topic": "Staff Picks", "topic_id": 1, "type": "image/gif", "ups": 30727, "views": 411296, "vote": null, "width": 720},
            {"account_id": null, "account_url": null, "ad_config": [Object], "ad_type": 0, "ad_url": "", "animated": false, "bandwidth": 509437551744, "comment_count": 839, "datetime": 1472237136, "description": null, "downs": 301, "edited": 0, "favorite": false, "favorite_count": 7771, "has_sound": false, "height": 2241, "id": "H37kxPH", "in_gallery": true, "in_most_viral": true, "is_ad": false, "is_album": false, "link": "https://i.imgur.com/H37kxPH.jpg", "nsfw": false, "points": 24588, "score": 28405, "section": "pics", "size": 858402, "tags": [Array], "title": "I bought a beer cozy that looks like a ballistic vest and it fits on my dog", "topic": "National Dog Day", "topic_id": 50, "type": "image/jpeg", "ups": 24889, "views": 593472, "vote": null, "width": 1793},
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
  const wrapper = await (shallow(<SearchScreen  />));
  await wrapper.instance().startSearch("cat") 

  // "j attend que mon state image (un tableau) fasse une longueur de trois"
  expect(wrapper.state('images')).toHaveLength(1);
  // "jattend que le champ source.uri a l index 0 de mon tableau image correpsonent ce cette url"
    // expect(wrapper.state('images')).toHaveLength(3);

});


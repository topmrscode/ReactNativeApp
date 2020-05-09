import React from 'react';
import MyAccount from '../src/components/Account/MyAccount.js';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';

// -------------------------------------------------------
// RECUPERER LES DONNES DEPUIS AXIOS / RENDU DES DONNEES  
// -------------------------------------------------------


// CONFIGURER LE TEST ------
jest.disableAutomock();

// mocker axios
jest.mock("axios");
// mocker le module dans le fichier correpondant 
jest.mock('../src/api/Account.js', () => ({
  // je donne la fonction du componentWillMount et ses parametres
  GetAccountAvatar: () => {
    // retourner ce que doit renvoyer la fonction
    return (
      new Promise((resolve, reject) => {
        var data = {
          data: {
            avatar: "http://www.monavatar.com/face.jpg"
          }
        }
        // Correspond au then qui est apres le GetAccountAvatar dans notre componentDidMount du componentt MyAccount
        resolve(data);
      })
  )},
  GetAccountSettings: () => {
    return (
      new Promise((resolve, reject) => {
        var data = {
          data: {
            email: "mon.email@domain.fr",
            account_url: "http://mon.domain.com"
          }
        }
        resolve(data);
      })
    )
  }
}));

Enzyme.configure({ adapter: new Adapter() });
test('renders correctly', async () => {
  wrapper = await (shallow(<MyAccount />));
  // Ma fonction va attendre que la ligne du dessus soit fini avant de continuer

  const tree = renderer.create(wrapper).toJSON();
  expect(tree).toMatchSnapshot();

  expect(wrapper.state('avatar')).toEqual('http://www.monavatar.com/face.jpg');
  expect(wrapper.state('email')).toEqual('mon.email@domain.fr');
  expect(wrapper.state('username')).toEqual('http://mon.domain.com');
});
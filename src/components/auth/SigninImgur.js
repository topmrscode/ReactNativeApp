import * as React from 'react';
import {
  StyleSheet,
  Linking
} from 'react-native';  
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage'

//-------------------------------------------
// Objectif : AFFICHER LA PAGE DE LOGIN IMGUR
//-------------------------------------------

class SignInImgurScreen extends React.Component {

    static navigationOptions = {
      title: 'Sign in with Imgur ',
    };

  // RECUPERER LES PARAMETRES DANS L URL 
  navigate = async url => {
    if (url) {
      url = url.replace('#', '&');
      let params = {};
      const regex = /([^&=]+)=([^&]*)/g;
      let m;

      while ((m = regex.exec(url))) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
      }
      // ON LES STOCKE DANS LOCAGE (TOKEN et l username ('MrsCode'))
      await AsyncStorage.setItem('BearerToken', params.access_token);
      await AsyncStorage.setItem('username', params.account_username);
      this.props.navigation.navigate('App');
    }
  };
// indiaue que ce component socuupera de la gestion des callback de la part de imgur (mon url appelle apres  s etre autheentifie avec IMGUR)
  componentDidMount() {
    Linking.getInitialURL().then(url => {
      this.navigate(url);
    });
  }

  render() {
    return (
      <WebView
        source={{
          uri: `https://api.imgur.com/oauth2/authorize?client_id=a7206615a6d7837&response_type=token`, // URL QUI RENVOIT VERS LA PAGE LOGIN DE IMGUR
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
  
export default SignInImgurScreen;
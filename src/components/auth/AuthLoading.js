import * as React from 'react';
// IMPORT REACT STYLE 
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
  } from 'react-native';
  // IMPORT POUR LA RECUPERATION DU TOKEN
  import AsyncStorage from '@react-native-community/async-storage'

//----------------------------------------------------------------
// Objectif : RECUPERER LE TOKEN / VERIFIER LES ROUTES AUTORISEES
//----------------------------------------------------------------

class AuthLoadingScreen extends React.Component {
    constructor() {
      super();
      this._bootstrapAsync();
    }
  
    // etape 1 : recuperer le token
    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('BearerToken');
  
    // etape 2 : verifier l existence du token et rediriger vers App 
    // (nom donnee a ma constante qui contient toutes les routes auquelles l user peut acceder une fois connecte)
    // sinon rediriger vers Auth qui correspond a mon login (voir /Router)
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };
  
    // etape 3 : retourner le Template
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator /> 
          <StatusBar barStyle="default" />
        </View>
      );
    }
  }

export default AuthLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
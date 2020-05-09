import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AuthLoadingScreen from './src/components/auth/AuthLoading'
import SignInScreen from './src/components/auth/Signin'
import SignInImgurScreen from './src/components/auth/SigninImgur'

import * as React from 'react';

import ImageUploader from './src/components/images/ImageUploader'
import SearchScreen from './src/components/search/Search'
import FavoritesScreen from './src/components/images/Favorites'
import MyGalleryScreen from './src/components/images/MyGallery'

import FeedScreen from './src/components/PicturesFeed'
import MyAccountScreen from './src/components/account/MyAccount'
import Icon from 'react-native-vector-icons/FontAwesome';

// -----------------------------------------------
// GESTION DE LA NAVIGATION DANS MON APPLICATION 
// -----------------------------------------------

// 1. NAVIGATION ENTRE LES DIFFERNTES PAGES DEPUIS UNE 'BUTTON TAB' (composants a appeller)
const Tabs = createBottomTabNavigator(
  {
    Home: {
      screen: FeedScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name={'home'} color={tintColor} size={25} />
        ),
      },
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name={'search'} color={tintColor} size={25} />
        ),
      },
    },
    Upload: {
      screen: ImageUploader,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name={'plus-square'} color={tintColor} size={25} />
        ),
      },
    },
    Favorites: {
      screen: FavoritesScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name={'heart'} color={tintColor} size={25} />
        ),
      },
    },
    MyAccount: {
      screen: MyAccountScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name={'user'} color={tintColor} size={25} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    lazy: false,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'grey',
      showLabel: false,
      keyboardHidesTabBar: false,
      style: {
        backgroundColor: '#323539',
        paddingBottom: 2,
        borderTopColor: '#3f4346',
      },
    },
  },
);

const AppStack = createAppContainer(Tabs);


// GESTION DE LA NAVIGATION POUR L ' AUTHENTIFICATION (Composants a appeller)
const AuthStack = createStackNavigator({
  SignIn: 
    {screen: SignInScreen, navigationOptions: {header: null}},
  SignInImgur:
  {screen: SignInImgurScreen}
})

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen, // juge pour savoir ou rediriger et les pasges accessibles fonction du token 
    App: AppStack, 
    MyGallery : {screen: MyGalleryScreen},
    Auth: {screen: AuthStack, path: ''},
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

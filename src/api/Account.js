// appel A L API IMGUR 
import request from './Wrapper';
import 
    AsyncStorage
  from '@react-native-community/async-storage';

// --------------------------------------
// APPELS A L'API IMGUR LIES A MON COMPTE   
// -------------------------------------

// 1. Recuperer mon avatar
const GetAccountAvatar = async function() {
    const bearerToken = await AsyncStorage.getItem('BearerToken');
    const username = await AsyncStorage.getItem('username');
    return request({
        url: `/account/${username}/avatar`,
        method: 'GET',
        headers: { 
          Authorization: `Bearer ${bearerToken}`,
        },
    })
};

// 2. Recuperer mes informations personnelles
const GetAccountSettings = async function() {
    const bearerToken = await AsyncStorage.getItem('BearerToken');
    return request({
        url: `/account/me/settings`,
        method: 'GET',
        headers: { 
          Authorization: `Bearer ${bearerToken}`,
        },
    })
};

export {
    GetAccountAvatar,
    GetAccountSettings,
}



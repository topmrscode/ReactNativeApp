import request from './Wrapper';
import 
    AsyncStorage
  from '@react-native-community/async-storage';

// --------------------------------------
// APPELS A L'API IMGUR LIES AUX IMAGES   
// -------------------------------------

// 1. Mettre une image sur Imgur
const PostImageOnApi = async function(image) {
    const bearerToken = await AsyncStorage.getItem('BearerToken');
    return request({
        url: "/upload",
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        data: {
            type: 'base64',
            image: `${image.data}`,
        }
    }).then((resp) => {
        console.log(resp);
    }).catch((err) => {
        console.log(err);
    })
};

// 2. Recuperer les images de mon compte
const GetAccountImages= async function() {
    const bearerToken = await AsyncStorage.getItem('BearerToken');
    return request({
        url: '/account/me/images',
        method: 'GET',
        headers: { 
          Authorization: `Bearer ${bearerToken}`,
        },
    })
};

// 3. supprimer une image
const DeleteImage = async function(image_id) {
    const bearerToken = await AsyncStorage.getItem('BearerToken');
    return request({
        url: `/image/${image_id}`,
        method: 'DELETE',
        headers: { 
          Authorization: `Bearer ${bearerToken}`,
        },
    })
};
// 4. ajouter/supprimer une image de mes favoris 
const FavoriteImage = async function(image_id) {
    const bearerToken = await AsyncStorage.getItem('BearerToken');
    return request({
        url: `/image/${image_id}/favorite`,
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${bearerToken}`,
        },
    })
};

// 5. recuperer mes images en favoris 
const GetFavoriteImages = async function() {
    const bearerToken = await AsyncStorage.getItem('BearerToken');
    const username = await AsyncStorage.getItem('username');
    return request({
        url: `/account/${username}/favorites/`,
        method: 'GET',
        headers: { 
          Authorization: `Bearer ${bearerToken}`,
        },
    })
};

// 6. afficher mes images depuis un search
const GetGalleryFromApi = async function(search) {
    const bearerToken = await AsyncStorage.getItem('BearerToken');
    return request({
        url: `/gallery/search/top?q=${search}`,
        method: 'GET',
        headers: { 
          Authorization: `Bearer ${bearerToken}`,
        },
    })
};

// 7. afficher le feed
const DisplayFeed = async function(section, sort) {
    const bearerToken = await AsyncStorage.getItem('BearerToken');
    return request({
        url: `/gallery/${section}/${sort}`,
        method: 'GET',
        headers: { 
          Authorization: `Bearer ${bearerToken}`,
        },
    })
};


export {
    PostImageOnApi, 
    GetAccountImages, 
    DeleteImage,
    FavoriteImage,
    GetFavoriteImages,
    GetGalleryFromApi,
    DisplayFeed

}




import axios from 'axios';

// ------------------------------------------------
// APPELS RESEAUX A L API IMGUR (Gestion d'erreurs)    
// -------------------------------------------------

// definition de la base de l url de nos appel 
const client = axios.create({
  baseURL: 'https://api.imgur.com/3/'
});

// en cas de succes 
const request = function(options) {
  const onSuccess = function(response) {
    return response.data;
  };
// en cas d'erreur
const onError = function(error) {
  console.debug('Request Failed:', error.config);
  if (error.response) {
    console.debug('Status:', error.response.status);
    console.debug('Data:', error.response.data);
    console.debug('Headers:', error.response.headers);
  } else {
    console.debug('Error Message:', error.message);
  }
  // retourne une Promise (resolve. reject)
  return Promise.reject(error.response || error.message);
};

  return client(options)
    .then(onSuccess) // en cas de succes, on fait.then
    .catch(onError);
};

export default request;
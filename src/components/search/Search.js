import * as React from 'react';
import {
  View,
  Button,
  Text
} from 'react-native';
import { TextInput } from '../../../node_modules/react-native-gesture-handler';
import Gallery from '../../../node_modules/react-native-image-gallery';
import Icon from 'react-native-vector-icons/FontAwesome';

import {FavoriteImage} from '../../api/Image'
import {GetGalleryFromApi} from '../../api/Image'
import BaseContainer from '../../assets/styles/Base';

// ----------------------------------------------------------
// GESTION ET AFFICHAGE DES IMAGES A PARTIR D'UNE RECHERCHE
// ----------------------------------------------------------

class SearchScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      param : '',
      images : [],
      index: 0,
    }
    this.onChangeImage = this.onChangeImage.bind(this);
    this.startSearch = this.startSearch.bind(this)
    this.onClickFavorite = this.onClickFavorite.bind(this);
    this.onClickUnFavorite = this.onClickUnFavorite.bind(this);
  }

  // ------- NOTE ASYNC / AWAIT -----


  // Appel de l'api => recuperer les images correspondant a mon imput
  async startSearch(){  // tout appel a une fonction asynchrome retourne une promise
    await GetGalleryFromApi(this.state.param).then((data)=>{ // 'AWAIT' permet d'attendre que l operation declenchee par l'appel a
    // la fonction async 'StartSearch 'soit terminee et donc de recuperer directement la valeur de retour de la promise (ici data)
    // ne peut etre utilisee que depuis une fonction asynchrome
      let imgs = [];
      // Recuperation des images sous format jpeg et png uniquement
      data.data.forEach((item, index) => {
        if (item.type == "image/jpeg" || item.type == "image/png") {
          // ajout de champs necessaires pour le rendu visuel et l'utilisation de la lib "gallery"
          item.source = {uri : item.link}
          item.caption = ""
          imgs.push(item)
        }
      })
      this.setState({images: imgs});

    }).catch(error => {
      console.debug(error);
    });
  }

    onChangeImage (index) {
      this.setState({ index });
  }

    // mettre en favoris 
    onClickFavorite(index){
        FavoriteImage(this.state.images[index].id)

    }
    // enlever des favoris (meme appel)
    onClickUnFavorite(index){
      FavoriteImage(this.state.images[index].id)

  }
  // methode de la lib "gallery"
  get caption () {
    const { images, index } = this.state;
    if (this.state.images.length > 0) {
    return (
        <View style={{ bottom: 0, height: 100, backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '100%', position: 'absolute', justifyContent: 'center' }}>
                {(images[index] && images[index].favorite == true) ? 
                <Icon.Button
                    name="heartbeat"
                    backgroundColor="#3b5998"
                    onPress={() => this.onClickUnFavorite(index)}
                  >
                       <Text style={{color : "white"}}>Remove to favorite</Text>
                  </Icon.Button>
                  :
                <Icon.Button
                    name="heart"
                    backgroundColor="#3b5998"
                    onPress={() => this.onClickFavorite(index)}
                  >
                <Text style={{color : "white"}}>Add to favorite</Text>                  
                </Icon.Button>
                }
              
              <Icon.Button
                name="eye"
                backgroundColor="#3b5998"
              >
                <Text style={{color:"#ffffff"}}>{ (images[index] && images[index].views)}</Text>
              </Icon.Button>
        </View>
    );
  } else {
    return(
      <View style={{ bottom: 0, height: 100, backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '100%', position: 'absolute', justifyContent: 'center' }}></View>

    )
  }
}

    render() {
      if (this.state.images != [])  {
      return (
        <BaseContainer title={'Search'} font={''} fontSize={20}>
          <View style={{ flex: 1 }} >
            <TextInput
          onChangeText={(text) => this.setState({param: text})} 
          placeholder="Search ..."
          />
          <Button color="#3b5998" title="Search" onPress={this.startSearch}/>
          <Gallery
            style={{flex: 1, backgroundColor: '#696969'}}
            images={this.state.images}
            onPageSelected={this.onChangeImage}
            initialPage={0}
          />
          { this.caption }
          </View>
      </BaseContainer>

      )
      }
      else {
          return (
            <BaseContainer title={'Search'} font={''} fontSize={20}>
              <View>
                <TextInput
                  onChangeText={(text) => this.setState({param: text})} 
                  placeholder="Search ..."
                />
                <Button title="Search" onPress={this.startSearch}/>
              </View>
            </BaseContainer>
          )
      }
}
}

export default SearchScreen
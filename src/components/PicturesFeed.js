import * as React from 'react';
import {
  View,
  Text
} from 'react-native';
import Gallery from 'react-native-image-gallery';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import BaseContainer from '../assets/styles/Base';


import {FavoriteImage} from '../api/Image'
import {DisplayFeed} from '../api/Image'

// --------------------------------------------------------------
// GESTION ET AFFICHAGE DES IMAGES EN FEED / GESTION DES FILTRES 
// -------------------------------------------------------------

class FeedScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            images : [],
            err : "",
            index: 0,
        }
        this.onChangeImage = this.onChangeImage.bind(this);
       
    }
    // appel de la methode pour obtenir les images du compte de l user connecte
    async componentDidMount() { // tout appel a une fonction asynchrome retourne une promise
        let images = []
        // si j arrive dans le then c est que j ai eu un resultat, qui est sous forme de tableau
        await DisplayFeed("hot","top").then((data) => {
            // 'AWAIT' permet d'attendre que l operation declenchee par l'appel a
        // la fonction async 'ComponentDidMount 'soit terminee et donc de recuperer directement la valeur de retour de la promise (ici data)
        // ne peut etre utilisee que depuis une fonction asynchrome
            data.data.forEach((item, index) => {
                if (item.images != undefined && (item.images[0].type == "image/jpeg" || item.images[0].type == "image/png")) {
                    // Modification du format afin qu'il puisse etre lu par "Gallery"
                    if (item.images[0].link.includes("i.imgur.com") == false) {
                        item.source = {uri: "https://i.imgur.com/" + item.images[0].id + ".jpg"}
                    } else {
                     item.source = {uri : item.images[0].link + ".jpg"}
                    }
                    item.id = item.images[0].id
                    item.caption = ""
                    images.push(item)
                }
            })
               // je met a jour ma variable image avec le tableau 
            this.setState({images : images})
        }).catch((err) => {
            this.setState({err : err})
        })
    }

    onChangeImage (index) {
        this.setState({ index });
    }

    // mettre en favoris 
    onClickFavorite(index){
        FavoriteImage(this.state.images[index].id)

    }
    // filtrer 
    filterSearch(value){
        let images = []
        DisplayFeed(value, "top").then((data) => {
            data.data.forEach((item, index) => {
             if (item.images != undefined && (item.images[0].type == "image/jpeg" || item.images[0].type == "image/png")) {
                 if (item.images[0].link.includes("i.imgur.com") == false) {
                     item.source = {uri: "https://i.imgur.com/" + item.images[0].id + ".jpg"}
                 } else {
                  item.source = {uri : item.images[0].link + ".jpg"}
                 }
                 item.id = item.images[0].id
                 item.caption = ""
                 images.push(item)
             }
         })
            // je met a jour ma variable image avec le tableau 
         this.setState({images : images})
     }).catch((err) => {
         this.setState({err : err})
     })
    }
   
    // caption est une methode de la lib Gallery 
    get caption () {
        const { images, index } = this.state;
        return (
            <View style={{ bottom: 0, height: 120, backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '100%', position: 'absolute', justifyContent: 'center' }}>
                 <Icon.Button
                    name="heart"
                    backgroundColor="#3b5998"
                    onPress={() => this.onClickFavorite(index)}
                  >
                    <Text style={{color : "white"}}>Add to favorite</Text>
                  </Icon.Button>
            
                  <Icon.Button
                    name="eye"
                    backgroundColor="#3b5998"
                  >
                    <Text style={{color:"#ffffff"}}>{ (images[index] && images[index].views)}</Text>
                  </Icon.Button>
                  <Icon.Button
                    
                    name="user"
                    backgroundColor="#3b5998"
                  >
                    <Text style={{color:"#ffffff"}}>{ (images[index] && images[index].account_url)}</Text>
                  </Icon.Button>
            </View>
        );
    }

    // afficher mes images / mon select / et les captions
    render() {
        if (this.state.images != [])  {
        return (
            <BaseContainer title={'Pictures Feed'} font={''} fontSize={20}>
                <View style={{ flex: 1 }} >
                    <RNPickerSelect 
                        onValueChange={(value) => this.filterSearch(value)}
                        items={[
                            { value: 'hot', label: 'Viral', color:"#3b5998" },
                            { value: 'top', label: 'Top', color:"#3b5998" },
                            { value: 'user', label: 'User', color:"#3b5998" },
                        ]}
                    />
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
                <BaseContainer title={'Pictures Feed'} font={''} fontSize={20}>
                    <View>
                        <Text style={{fontSize : 40}}>{this.state.err}</Text>
                    </View>
               </BaseContainer>
            )

        }
}

}

export default FeedScreen

import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Image,
    View, 
    Text
  } from 'react-native';
import {GetFavoriteImages} from '../../api/Image'
// import de librairie pour le visuel
import Gallery from 'react-native-image-gallery';
import {FavoriteImage} from '../../api/Image'
import BaseContainer from '../../assets/styles/Base';

// ----------------------------------------------------------
// AFFICHER LES IMAGES MISES EN FAVORIS / SUPPRIMER DES FAVORIS
// ----------------------------------------------------------


class FavoritesScreen extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            images : [],
            err : "",
            index: 0,
        }
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onClickUnFavorite = this.onClickUnFavorite.bind(this);
    }
    // appel de la methode pour obtenir les images du compte de l user connecte
    componentDidMount(){
        // si j arrive dans le then c est que j ai eu un resultat, qui est sous forme de tableau
       var data = GetFavoriteImages().then((data) => {
           // je parcoure mon tableau et pour chaque item je cree un nouveau champs
           // avec le nom source et caption (utilise dans notre render pour afficher une image)
           data.data.forEach((item, index) => {
            if (item.link.includes("i.imgur.com") == false) {
                item.source = {uri: "https://i.imgur.com/" + item.id + ".jpg"}
            } else {
             item.source = {uri : item.link}
            }
            item.caption = ""
        })
           // je met a jour ma variable image avec le tableau 
        this.setState({images : data.data})
    }).catch((err) => {
        this.setState({err : err})
    })
    }

    // enlever des favoris (meme appel)
    onClickUnFavorite(index){
        FavoriteImage(this.state.images[index].id)
  
    }

    onChangeImage (index) {
        this.setState({ index });
    }
    // caption est une methode de la lib Gallery 
    get caption () {
        const { images, index } = this.state;
        return (
            <View style={{ bottom: 0, height: 100, backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '100%', position: 'absolute', justifyContent: 'center' }}>
                <Icon.Button
                    name="heartbeat"
                    backgroundColor="#3b5998"
                    onPress={() => this.onClickUnFavorite(index)}
                  >
                       <Text style={{color : "white"}}>Remove to favorite</Text>
                  </Icon.Button>  
                  <Icon.Button
                    name="eye"
                    backgroundColor="#3b5998"
                  >
                    <Text style={{color:"#ffffff"}}>{ (images[index] && images[index].views)}</Text>
                  </Icon.Button>
            </View>
        );
    }

    // AFFICHER MON IMAGE 
    render() {
        if (this.state.images != [])  {
        return (
            <BaseContainer title={'Favorites'} font={''} fontSize={20}>
            <View style={{ flex: 1 }} >
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
                <BaseContainer title={'Favorites'} font={''} fontSize={20}>
                    <View>
                        <Text style={{fontSize : 40}}>{this.state.err}</Text>
                    </View>
                </BaseContainer>
            )

        }
}

}

export default FavoritesScreen
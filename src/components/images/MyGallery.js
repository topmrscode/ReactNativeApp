
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    View, 
    Text, 
  } from 'react-native';
import {GetAccountImages} from '../../api/Image'
import {DeleteImage} from '../../api/Image'
import BaseContainer from '../../assets/styles/Base';

// ----------------------------------------------------------
// AFFICHER LES IMAGES PRISES PAR L'USER 
// ----------------------------------------------------------

// import de librairie pour le visuel
import Gallery from 'react-native-image-gallery';

class MyGallery extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            images : [],
            err : "",
            index: 0,
        }
        this.onChangeImage = this.onChangeImage.bind(this);
       
    }

    // appel de la methode pour obtenir les images du compte de l user connecte
    componentDidMount(){
        // si j arrive dans le then c est que j ai eu un resultat, qui est sous forme de tableau
       var data = GetAccountImages().then((data) => {
           // je parcoure mon tableau et pour chaque item je cree un nouveau champs
           // avec le nom source et caption (utilise dans notre render pour afficher une image)
           data.data.forEach((item, index) => {
               item.source = {uri : item.link}
               item.caption = ""
           })
           // je met a jour ma variable image avec le tableau 
        this.setState({images : data.data})
    }).catch((err) => {
        this.setState({err : err})
    })
    }

    onChangeImage (index) {
        this.setState({ index });
    }
   
    // DELETE IMAGE
    onClickDelete(index){
        let images = this.state.images;
        let image_id = images[index].deletehash;
        DeleteImage(image_id)
    }

    // caption est une methode de la lib Gallery 
    get caption () {
        const { images, index } = this.state;
        return (
            <View style={{ bottom: 0, height: 120, backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '100%', position: 'absolute', justifyContent: 'center' }}>
            
            
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
                  <Icon.Button
                    name="trash"
                    backgroundColor="#3b5998"
                    onPress={() => this.onClickDelete(index)}
                  >
                    Delete
                  </Icon.Button>
            </View>
        );
    }

    // AFFICHER MON IMAGE 
    render() {
        if (this.state.images != [])  {
        return (
          <BaseContainer title={'My images'} font={''} fontSize={20}>
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
              <BaseContainer title={'My images'} font={''} fontSize={20}>
                <View>
                  <Text style={{fontSize : 40}}>{this.state.err}</Text>
               </View>
              </BaseContainer>
            )

        }
}

}

export default MyGallery
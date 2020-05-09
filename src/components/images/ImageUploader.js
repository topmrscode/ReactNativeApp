import * as React from 'react';
// iNPORT POUR UPLOADER UNE PHOTO
import ImagePicker from 'react-native-image-picker';
import {
  Button,
  StatusBar,
  StyleSheet,
  View,
  Image, 
  Text
} from 'react-native';

import {PostImageOnApi} from '../../api/Image'
import BaseContainer from '../../assets/styles/Base';
import Icon from 'react-native-vector-icons/FontAwesome';


// ----------------------------------------------------------
// IMPORTER UNE IMAGE DEPUIS MON TELEPHONE : options => 
// - depuis la galleries d'images sur mon tel
// - prendre une photo
// ----------------------------------------------------------

class ImageUploader extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      imageSource : ""
    }

    this.ShowPicker = this.ShowPicker.bind(this);

  }

  ShowPicker(){
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    
    ImagePicker.showImagePicker(options, (response) => {
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // appel de ma fonction POST pourr uploader l image esur IMGUR
        // une fois que je les mis sur imgur, je veux l afficher sur ma page
        PostImageOnApi(response).then((data) => {
          this.setState({imageSource : {uri : response.uri}})
        })
      }
    }); 
  }

    static navigationOptions = {
      title: 'Import an Image here',
    };
  
    render() {
      if (this.state.imageSource != "") {
      return (
        <BaseContainer title={'Picture Uploader'} font={''} fontSize={20}>
        <View style={styles.container}>
         <Icon  style={{color:"#3b5998"}} name={'upload'} size={100} onPress={this.ShowPicker} />
         <StatusBar barStyle="default" />
         <Image style={styles.image} source={this.state.imageSource} />
        </View>
        </BaseContainer>
      );
      }
      else {
        return (
          <BaseContainer title={'Picture Uploader'} font={''} fontSize={20}>
            <View style={styles.container}>
            <Icon  style={{color:"#3b5998"}} name={'upload'} size={100} onPress={this.ShowPicker} />
              <StatusBar barStyle="default" />
              <Text>Upload an image</Text>
            </View>
          </BaseContainer>
        );
      }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"#dfe1ee"
    },
    image: {
      height : 400,
      width: 400
    }
});
    
export default ImageUploader;

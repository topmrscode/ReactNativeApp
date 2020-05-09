import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity 
} from 'react-native';
import Video from 'react-native-video';


//--------------------------------------------------
// Objectif : REDIRIGER VERS LA PAGE DE LOGIN IMGUR
//--------------------------------------------------

class SignInScreen extends React.Component {
  constructor(props){
    super(props)
    this.signinAsync = this.signinAsync.bind(this);
}
    static navigationOptions = {
      title: 'Please sign in',
    };

    _callSigninImgur() {
      this.props.navigation.navigate('SignInImgur');
    }

    async signinAsync() {
      this._callSigninImgur()
    };

    render() {
      return (
        <View style={styles.container}>
           <Video
        source={require("../../assets/video/Social.mp4")}
        rate={1.0}
        volume={1.0}
        muted={false}
        resizeMode={'cover'}
        repeat
        style={styles.video}
      />
          <Text style={styles.appname}>Pictagram</Text>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Pictagram !</Text>
        <Text style={styles.description}>
          Created by Laura Baudean
        </Text>
        <TouchableOpacity style={styles.buttonConnect} onPress={this.signinAsync}>
          <Text style={styles.buttonText}>Login with Imgur</Text>
        </TouchableOpacity>
      </View>
        </View>
      );
    }
}
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    justifyContent: 'space-between',
    padding: 20,
    textAlign: 'center',
    flexDirection: 'column'
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  appname: {
    fontFamily: 'Catalunyademo',
    fontSize: 30,
    textAlign: 'center',
    color: '#3b5998',
    marginTop: 30,
  },
  title: {
    color: '#3b5998',
    marginTop: '50%',
    marginBottom: 20,
    marginHorizontal: 20,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  description: {
    letterSpacing: 3,
    color: '#3b5998',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  buttonConnect: {
    marginTop: 50,
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#3b5998',
    backgroundColor: 'transparent',
    color: '#3b5998',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#3b5998',
    textTransform: 'uppercase',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
});

export default SignInScreen;
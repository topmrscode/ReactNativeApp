
import React from 'react'
import {
    View,
    Text, 
    Button, 
    StyleSheet,
    TouchableOpacity
  } from 'react-native';
import BaseContainer from '../../assets/styles/Base'
import AsyncStorage from '@react-native-community/async-storage'

import {GetAccountAvatar} from '../../api/Account'
import {GetAccountSettings} from '../../api/Account'
import { Avatar } from '../../../node_modules/react-native-elements';

// -----------------------------------------
// GESTION ET AFFICHAGE DE LA PAGE PROFILE
// ----------------------------------------

class MyAccountScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            avatar : '',
            email : '',
            username : '',
        }
    }

    //  Appeller l'api imgur => recuperer l'avatar
    async componentDidMount(){
        
        // getSettings contient une promise qui ne sera finie qu'a la fin du then
        const getSettings = GetAccountSettings().then((data)=> {
            this.setState({email : data.data.email, username : data.data.account_url})
        })

        const getAvatar = GetAccountAvatar().then((data) => {
            this.setState({avatar : data.data.avatar})
        })

        // 'AWAIT' permet d'attendre que l operation declenchee par l'appel a
        // la fonction async 'ComponentDidMount 'soit terminee et donc de recuperer directement la valeur de retour de la promise (ici data)
        // ne peut etre utilisee que depuis une fonction asynchrome
        // getSettings contient une promise qui ne sera finie qu'a la fin du then

        // Les deux const sont des promesses
        // Pour attendre que les deux promesses aient finies de s'executer,
        // Il faut utiliser cette syntaxe.
        await Promise.all([getSettings, getAvatar])
    }
    // Deconnecter le user 
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
      };
    // Naviguer jusq'a ma page gallery 
    _imageGalleryAsync = async () => {
        this.props.navigation.navigate('MyGallery');
    };

    render() {
        return (
            <BaseContainer title={'Profil'} font={''} fontSize={20}>
                <View style={styles.container} >
                   <Avatar
                        size="xlarge"
                        rounded
                        activeOpacity={0.7}
                        source={{
                          uri:
                            this.state.avatar,
                        }}
                    />
                    <Text style={styles.text}>{this.state.username}</Text>
                    <Text>{this.state.email}</Text>
                    <TouchableOpacity style={styles.buttonConnect} onPress={this._imageGalleryAsync}>
                        <Text style={styles.buttonText}>My images</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonConnect} onPress={this._signOutAsync}>
                        <Text style={styles.buttonText}>Sign Out</Text>
                    </TouchableOpacity>
            
                </View>
            </BaseContainer>

        )
}

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:"#dfe3ee",
      fontFamily: 'Catalunyademo'
    },
    text: {
        marginTop: 20,
        fontFamily: 'Catalunyademo'
    },
    buttonConnect: {
        marginTop: 20,
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#3b5998',
        backgroundColor: 'transparent',
        color: '#3b5998',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
      buttonText: {
        color: '#3b5998',
        textTransform: 'uppercase',
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 3,
    },
});


export default MyAccountScreen
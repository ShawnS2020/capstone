import React from 'react';
import { TouchableOpacity, StyleSheet, TextInput, Text, View, Platform, Image} from 'react-native';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '../firebase';

const LoginScreen = ( {navigation} ) => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const auth = getAuth();
    const inputContWidth = Platform.OS === 'web' ? '25%' : '60%';
    const buttonContWidth = Platform.OS === 'web' ? '15%' : '40%';

    const handleRegistration = () => {
        createUserWithEmailAndPassword(auth, email, password)   // auth is given by device, used by firebase
        .then(userCredential => {                               // 'const userID = auth.currentUser.uid;' can be used in homescreen
            console.log(userCredential.user.email, "is registered");    // ^ to set user ID within firebase to be same as auth ID
        })
        .catch(error => alert(error.message))
    }

    const handleLogin = (e) =>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)       
        .then((userCredential) =>                               // textfield to allow input for email & password to login
        {
            console.log(userCredential.user.email, "is logged in");
            if (userCredential)
            {
                navigation.navigate("Forum")     // navgiate to "ForumScreen" route from App.js . Navigate somewhere else instead?
            }                                   
        }).catch(error => alert(error.message));
    }

    return(     // return UI where handleRegistration and handleLogin will be used
        
                <View style={ styles.container }>

                <View style = {styles.headerContainer}>
                    <Text style = {styles.headerText}>
                        Hobbyism
                    </Text>
                    <Image source={{uri: 'https://i.imgur.com/lL1nZ82.png'}}
               style={{width: 100, height: 100}} />
                </View>
                <View style = {[styles.inputContainer, {width: inputContWidth}]}>
                    <TextInput
                        placeholder = "email"
                        placeholderTextColor = "white"
                        value = {email}
                        onChangeText ={text => setEmail(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder = "password"
                        placeholderTextColor = "white"
                        value = {password}
                        onChangeText ={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />           
                </View>
        
                <View style={[styles.buttonContainer, {width: buttonContWidth}]}>
                    <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                    >
                        <Text style = {styles.buttonText}> Log in  </Text>
                    </TouchableOpacity>
        
                    <TouchableOpacity
                    onPress={handleRegistration}
                    style={[styles.button]}
                    >
                        <Text style = {styles.buttonOutlineText}> Create User </Text>
        
                    </TouchableOpacity>
        
                </View>
              </View>
    )
}
export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
        
    inputContainer: {
        width: '60%',
    
    },
    headerContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    input: {
        backgroundColor: 'rgba(183, 13, 1, .5)',
        color: 'white',
        fontWeight: '100',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 10,
    
    },
    buttonContainer: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    
    },
    button: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        backgroundColor: 'rgba(183, 13, 1, .7)',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 5,
    
    },
    buttonText: {
        color: 'white',
        fontWeight: '900',
    
    },
    buttonOutline: {
        backgroundColor: 'transparent'
        
    
    },
    buttonOutlineText: {
        color: 'white',
        fontWeight: '900',
    
    
    },
    headerText:{
        fontSize: 64,
        color: 'rgba(183, 13, 1, .7)',
        fontWeight: '100',
    }
    })
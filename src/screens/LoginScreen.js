import React from 'react';
import { TouchableOpacity, StyleSheet, TextInput, Text, View, Platform, Image, ScrollView } from 'react-native';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../firebase';
import { useGlobal } from '../state/GlobalContext';

export default function LoginScreen({ navigation }) {

    const auth = getAuth();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { login } = useGlobal();


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
        .then((userCredential) => {                 
            console.log(userCredential.user.email, "is logged in");
            login();
            if (userCredential)                     // if user successfully logs
            {
                // navigation.navigate("Forum")        // navgiate to "ForumScreen" route from App.js . Navigate somewhere else instead?
                navigation.navigate("Nav Tabs");
            }                                   
        }).catch(error => alert(error.message));
    }

    return (     // return UI where handleRegistration and handleLogin will be used
        <ScrollView>
            <View style={ styles.container }>
                <Image source={{uri: 'https://i.imgur.com/lL1nZ82.png'}} style={{width: 200, height: 200}} />
                <View style = {styles.headerCont}>
                    <Text style = {styles.headerText}>Hobbyist </Text>
                </View>
                <View style = {styles.inputWidth}>
                    <TextInput
                        placeholder = "email"
                        placeholderTextColor = "white"
                        value = {email}
                        onChangeText = {text => setEmail(text)}
                        style = {styles.input}
                    />
                    <TextInput
                        placeholder = "password"
                        placeholderTextColor = "white"
                        value = {password}
                        onChangeText = {text => setPassword(text)}
                        style = {styles.input}
                        secureTextEntry
                    />           
                </View>
                <View style={styles.buttonCont}>
                    <TouchableOpacity
                        onPress = {handleLogin}
                        style = {styles.button}
                    >
                        <Text style = {styles.buttonText}> Log in  </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleRegistration}
                        style={[styles.button]}
                    >
                        <Text style = {styles.buttonOutlineText}> Create User </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={login}
                        style={[styles.button]}
                    >
                        <Text>Bypass</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 15,
    }, 
    input: {
        backgroundColor: 'rgba(190, 20, 1, .5)',
        color: 'white',
        fontWeight: '100',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    inputWidth: {
        width: '70%',
    },
    headerCont: {
        alignItems: 'center',
        flexDirection: 'row', 
    },
    headerText:{
        fontSize: 60,
        color: 'rgba(180, 10, 1, .8)',
        fontWeight: '100',
    },
    buttonCont: {
        alignItems: 'center',
        width: '40%',
        justifyContent: 'center',
        marginTop: 10,
    },
    button: {
        alignItems: 'center',
        width: '100%',
        height: 40,
        backgroundColor: 'rgba(180, 10, 1, .8)',
        paddingVertical: 12,
        paddingHorizontal: 12,
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
    }
    })

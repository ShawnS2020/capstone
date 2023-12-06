import React from 'react';
import { useGlobal } from '../state/GlobalContext';
import { StyleSheet, TextInput, Text, View, Image, ScrollView, TouchableOpacity, Button } from 'react-native';
import { db, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, 
        serverTimestamp, collection, addDoc, doc, setDoc } from '../firebase';

export default function LoginScreen({ route, navigation }) {
    const userAuth = getAuth();
    const [email, setEmail] = React.useState('');       // email and PW should use different states from React
    const [password, setPassword] = React.useState('');
    const { login } = useGlobal();
    //const userID = auth.currentUser.uid;

    async function register(e){      // userCredential from Firebase documentation
        e.preventDefault();
        createUserWithEmailAndPassword(userAuth, email, password)   // auth is given by device, used by firebase    
        .then(userCredential => {                               // 'const userID = auth.currentUser.uid;' can be used in homescreen
            console.log("User account created:", userCredential.user.email);    // ^ to set user ID within firebase to be same as auth ID
            signInWithEmailAndPassword(userAuth, email, password);
            login();
            const userRef = doc(db, 'Users', email);    // create a doc in Users for new user using email as id
                setDoc(userRef, {email: email, posts: 0, createdAt: serverTimestamp() });  
            navigation.navigate("Setup 1");
        }).catch(e => alert(e.message))   // throws error from Firebase documentation
    }

    function signIn(e){
        e.preventDefault();
        signInWithEmailAndPassword(userAuth, email, password)       
        .then((userCredential) => {                 
            console.log("User signed in:", userCredential.user.email);
            login();
            /*** TODO: is this check redundant? ***/
            if (userCredential) {
                navigation.navigate("Nav Tabs");
            }
            // if(login) navigation.navigate("Nav Tabs");                    // if user successfully logs{}                                  
        }).catch(e => alert(e.message));
    }

    return (     
        <ScrollView>
            <View style={ styles.body }>
                <Image source={ {uri: 'https://i.imgur.com/lL1nZ82.png'} } style={ styles.imageStyle } />
                <View style = { styles.titleCont }>
                    <Text style = { styles.titleText }>Hobbyist</Text>
                </View>
                <View style = { styles.inputWidth }>
                    <TextInput style = { styles.textInputField }
                        autoCapitalize='none'
                        placeholder = "Enter Email"
                        placeholderTextColor = "white"
                        value = { email }
                        onChangeText = { text => setEmail(text) }
                    />
                    <TextInput style = { styles.textInputField }
                        value = { password }
                        secureTextEntry     // allows security features for mobile devices
                        placeholder = "Enter Password"
                        placeholderTextColor = "white"
                        onChangeText = { text => setPassword(text) }
                    />           
                </View>
                <View style={ styles.buttonList }>
                    <TouchableOpacity style = { styles.button }
                        onPress = { signIn }
                    >
                        <Text style = { styles.buttonContent }> Log in  </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.button }
                        onPress={ register }
                    >
                        <Text style = { styles.buttonContent }> Register </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.button }
                        onPress={ () => {
                            // Only log in if user in on forum screen
                            if (route.name == "Forum Hub") login()
                            navigation.navigate("Nav Tabs");
                        } }
                    >
                        <Text style = { styles.buttonContent }>{route.name == "Login" ? "Skip" : "Bypass (Test)"}</Text>
                    </TouchableOpacity> 
                    {route.name == "Login" ?
                        <TouchableOpacity style={ styles.button }
                             onPress={() => navigation.navigate("Setup 1")}
                        >
                            <Text style = { styles.buttonContent }>Set Up Steps</Text>
                        </TouchableOpacity> 
                    : null
                    }
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    body: {
        alignItems: 'center',
        height: '150%',
        backgroundColor: '#FFFFFF',
        paddingVertical: 15
    }, 
    imageStyle: {
        width: 200, 
        height: 200
    },
    textInputField: {
        backgroundColor: 'rgba(190, 30, 1, .5)',
        fontWeight: '100',
        marginTop: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15
    },
    inputWidth: {
        width: '75%'
    },
    titleCont: {
        alignItems: 'center',
        flexDirection: 'row' 
    },
    titleText:{
        fontSize: 60,
        color: 'rgba(185, 15, 5, 1)'
    },
    button: {
        alignItems: 'center',
        width: '75%',
        height: 40,
        backgroundColor: 'rgba(180, 10, 10, .8)',
        paddingVertical: 12,
        borderRadius: 5,
        marginTop: 5
    },
    buttonList: {
        alignItems: 'center',
        width: '40%',
        justifyContent: 'center',
        marginTop: 20
    },
    buttonContent: {
        color: 'gold'
    },
    })

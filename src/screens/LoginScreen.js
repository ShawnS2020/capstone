import * as React from 'react';
import {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '../firebase';

const LoginScreen = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigation = React.useNavigation();

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
                navigation.navigate("Home")     // navgiate to "Home" route from App.js . If login happens on forums, navigate 
            }                                   // to Forum screen instead?
        }).catch(error => alert(error.message));
    }

    return(     // return UI where handleRegistration and handleLogin will be used
        null
    )
}
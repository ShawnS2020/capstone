import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';

export default function ForumHubScreen({ navigation }) {
    return(
        <View style={ styles.container }>
            <Text style = {styles.headerText}>
                        Login to Access Forums
                    </Text>
            <View>
                <Button
                    onPress={() => navigation.navigate('Login')}
                    title="Login/Register"
                />
            </View>
        </View>
    );
}

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
        fontSize: 50,
        color: 'rgba(183, 13, 1, .7)',
        textAlign:'center',
        fontWeight: '100',
    }
    })
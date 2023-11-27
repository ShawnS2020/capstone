import { useGlobal } from '../state/GlobalContext';
import { StyleSheet, Button, Text, View } from 'react-native';

export default function SubforumScreen({ navigation }) {
    const { subforumTitle, setThreadTitle } = useGlobal();
    const passedVar = subforumTitle;

    function handleClickThread(threadTitle) {
        setThreadTitle(threadTitle);
        navigation.navigate('Thread');
    }

    return (        
        <View style={ styles.container }>
            <View style = {styles.subforumCont}>
                <Text style = {styles.subforumText}>
                     { passedVar } Subforum
                </Text>
            </View>
            <Button
                onPress={() => handleClickThread('Example Thread')}
                title = "Example Thread"
            />
            <Button
                onPress={() => handleClickThread('Another Example Thread')}
                title = "Another Example Thread"
            />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 20,
    },
    subforumCont: {
        alignItems: 'center',
        flexDirection: 'row', 
    },
    subforumText:{
        fontSize: 40,
        color: 'rgba(180, 10, 1, .8)',
        fontWeight: '100',
    },
    buttonCont: {
        alignItems: 'center',
        width: '40%',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: 'rgba(180, 10, 1, .8)',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginTop: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: '900',
    }
});
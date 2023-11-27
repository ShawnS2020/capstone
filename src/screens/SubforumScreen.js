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
        <View style={ styles.body }>
            <View style = { styles.subforumList }>
                <Text style = { styles.subforumText }>
                     { passedVar } Subforum
                </Text>
            </View>
            <Button style = { styles.button }
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
    body: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 20
    },
    subforumList: {
        alignItems: 'center'
    },
    subforumText:{
        fontSize: 40,
        color: 'rgba(185, 15, 5, 1)'
    },
    button: {
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: 'rgba(180, 10, 30)',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginTop: 5
    },
    buttonContent: {
        color: 'gold',
        fontWeight: '900'
    }
});
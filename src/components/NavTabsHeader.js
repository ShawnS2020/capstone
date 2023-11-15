import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function NavTabsHeader({ routeTitle, handleClickMenu }) {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{routeTitle}</Text>
            {routeTitle === 'Places' && (
                <TouchableWithoutFeedback onPress={handleClickMenu}>
                    <Ionicons name='menu' size={28} color="black" style={styles.icon} />
                </TouchableWithoutFeedback>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 95,
        backgroundColor: '#FFF',
        paddingLeft: 16,
        paddingTop: 53.5,
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
    },
    icon: {
        marginRight: 16,
    },
})
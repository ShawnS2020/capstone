import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function SubforumRecommendation({ title, numMembers, description }) {
    return (
        <View style={styles.subforum}> 
            <View style={{flex: 1}}>
                <View style={styles.headerWrapper}>
                    <Text style={{fontSize: 15, fontWeight:"bold", maxWidth: 80 }}>{title}</Text>
                    <Text style={{fontSize: 15}}>{numMembers} members</Text>
                </View>
                <Text style={{color: "gray"}}>A short description of the community</Text>
            </View>
            <TouchableOpacity
                onPress={() => {}}
                style={styles.buttonJoin}
            >
                <Text style={{color: '#FFF'}}>Join</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    subforum: {
        flexDirection: 'row',
        height: 100,
        width: '100%',
        borderColor: "black", 
        borderWidth: 1, 
        padding: 5,
        backgroundColor:'white'
    },
    headerWrapper: {
        flexDirection: 'row',
        columnGap: 8
    },
    buttonJoin: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '35%',
        height: 30,
        backgroundColor: 'royalblue',
        borderRadius: 10,
    },
});
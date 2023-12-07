import { StyleSheet} from "react-native";

export const myStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFF0',
        padding: 1,
    },

    forum_text: {
        backgroundColor: '#rgba(128, 10, 10, .8)',
        fontSize: 32,  
        fontWeight: 'bold',  
        color: 'gold',  
        textAlign: 'center',
        textAlignVertical: 'center',
        borderStyle: "solid",
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        padding: 8,
      },

    button_text: {
        backgroundColor:'rgba(128, 10, 10, .8)',
        color: 'gold',
        fontSize: 18,
        borderRadius: 7,
        textAlign: 'center',
        padding: 3,
        borderWidth: 1,
    },

    true_button: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 8,
      },

    subforumList: {
        alignItems: 'center'
    },

    subforumText:{
        fontSize: 40,
        padding:5,
        color: 'rgba(128, 10, 10, .8)'
    },

})

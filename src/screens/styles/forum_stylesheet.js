import {StyleSheet} from "react-native";

export const myStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFF0',
        padding: 1,
    },

    body: {
        flex: 1,
        backgroundColor: '#FFFFF0',
    },

    forum_text: {
        backgroundColor: '#rgba(128, 10, 10, .8)',
        fontSize: 28,  
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
        backgroundColor:'rgb(128, 10, 10)',
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

    bottomBar: {
        backgroundColor: "#E0A369",
        paddingVertical: 10,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    textBar: {
        backgroundColor: "#FFFFF0",
        color: "black",
        minHeight: 40,
        maxHeight: 300,
        minWidth: 240,
        maxWidth: 250,
        paddingHorizontal: 16,
        borderRadius: 24,
        marginHorizontal: 8,
        multiline: 'true',
    },

    send: {
        backgroundColor:'rgba(128, 10, 10, .8)',
        color: 'gold',
        fontSize: 18,
        borderRadius: 7,
        textAlign: 'center',
        padding: 7,
        borderWidth: 1,
    },

    send_button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingRight: 5,
      },

    chat: {
        backgroundColor: "rgba(218,165,32,.8)",
        margin: 10,
        padding: 10,
        borderRadius: 5,
    },

    chatContainer: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },

    shadow_container: {
        backgroundColor: '#FFFFF0',
        borderRadius: 5,
        elevation: 100,
        shadowColor: 'rgba(0, 0, 0, .2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

    create_thread: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#FFFFF0',
        paddingVertical: 20,
    },

    threadBodyInput: {  
        color: 'black',
        textAlignVertical: "top",
        marginTop: 5,
        marginLeft: 2,
    },

    thread_input_container: {
        backgroundColor: "rgba(218,165,32,.3)",
        color: 'black',
        textAlignVertical: "top",
        marginBottom: 5,
        width: '85%',
        marginTop: 5,
        height: '100%',
        borderRadius: 10,
    },

    titleInput: { 
        color: 'black',
        textAlignVertical: "top",
        marginLeft: 2,
        marginTop: 5,
    },

    title_input_container: {
        backgroundColor: "rgba(218,165,32,.5)",
        color: 'black',
        width: '85%',
        borderRadius: 10,
    },

    create_button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingRight: 5,
    },

    create: {
        backgroundColor:'rgba(128, 10, 10, .75)',
        color: 'gold',
        fontSize: 18,
        borderRadius: 7,
        textAlign: 'center',
        padding: 7,
        borderWidth: 1,
    },
})

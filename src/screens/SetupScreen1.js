import {View, Text, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
//import NavTabs from './NavTabs.js';
import PlacesScreen from './PlacesScreen.js';
import SetupScreen2 from './SetupScreen2.js';


const image = {uri: 'https://img.freepik.com/premium-vector/various-hobbies-icons-selection-white-background-vector_532963-598.jpg?w=1380'};

export default function SetupScreen1({ navigation }) {
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    
    <ScrollView style={{backgroundColor:'rgba(255,255,255,0.9)'}} >
    {/* <ScrollView style={{backgroundColor: "white"}}> */}
    <View style={{alignContent:"center",paddingTop:240, paddingLeft:5}}> 
      <Text style={{color: "black",  fontSize: 20, margin:10, }}>{'Type some hobbies you enjoy or\n are interested in.'}</Text>
      
   
      <View style={[{ width: "40%", marginBottom:10, paddingLeft:15}]}>
      <TextInput
          placeholder={'Enter your hobbies'}
          style={styles.inputStyle}
        />
        

<TouchableOpacity style={ styles.buttonAdd }
                         //onPress={SetupScreen}
                         onPress={() => navigation.navigate(PlacesScreen)}
                    >
                        <Text style = { styles.buttonContentAdd }> Add </Text>
                    </TouchableOpacity>
        <TouchableOpacity style={ styles.button }
                         
                         onPress={() => navigation.navigate(SetupScreen2)}
                    >
                        <Text style = { styles.buttonContent }> Next </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.buttonSkip }
                         
                         onPress={() => navigation.navigate(PlacesScreen)}
                    >
                        <Text style = { styles.buttonContent }> Skip </Text>
                    </TouchableOpacity>



            {/* <Button style={[{ borderRadius: 50}]}
              color="black" //change the button color
              onPress={() => navigation.navigate('SetupScreen1')}
              title="Next"
            /> */}
            
            </View>
          </View> 
          </ScrollView> 
          </ImageBackground>

)
}
          
          const styles = StyleSheet.create({
            body: {
                alignItems: 'center',
                height: '150%',
                backgroundColor: '#FFFFFF',
                paddingVertical: 15
            }, 
            image: {
                flex: 1,
                justifyContent: 'center',
                //opacity: .9,
                
              },
          button: {
            alignItems: 'center',
            width: '83%',
            height: 45,
            backgroundColor: 'black',
            paddingVertical: 12,
            borderRadius: 30,
            marginLeft:225,
            marginTop: 85,
          
        },
        buttonSkip: {
            alignItems: 'center',
            width: '83%',
            height: 45,
            backgroundColor: 'black',
            paddingVertical: 12,
            borderRadius: 30,
            marginLeft:225,
            marginTop: 10,
          
        },
        buttonList: {
            alignItems: 'center',
            width: '40%',
            justifyContent: 'center',
            marginTop: 20
        },
        buttonContent: {
            color: 'white'
        },
        textStyle: {
            textAlign: 'center',
            fontSize: 16,
            marginVertical: 10,
          },
          inputStyle: {
            width: '180%',
            height: 44,
            padding: 10,
            marginVertical: 10,
            backgroundColor: 'white',
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderTopWidth: 2,
            borderBottomWidth:2,
            marginTop: 10,
            marginBottom: -40,
          },
        buttonAdd: {
          alignItems: 'center',
          width: '50%',
          height: 40,
          backgroundColor: 'black',
          paddingVertical: 10,
          borderRadius: 0,
          marginLeft: 260,
          marginBottom: 100,
          
          
      },
    //   buttonAdd: {
    //     alignItems: 'center',
    //     width: '75%',
    //     height: 45,
    //     backgroundColor: 'black',
    //     paddingVertical: 12,
    //     borderRadius: 30,
    //     marginLeft:230,
    //     marginBottom: 100,
        
        
    // },
      buttonContentAdd: {
          color: 'white'
      },
        })
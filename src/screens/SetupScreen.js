import {View, Text, ImageBackground, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import SetupScreen1 from './SetupScreen1';

const image = {uri: 'https://img.freepik.com/premium-vector/various-hobbies-icons-selection-white-background-vector_532963-598.jpg?w=1380'};

export default function SetupScreen({ navigation }) {
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    
    <ScrollView style={{backgroundColor:'rgba(255,255,255,0.9)'}} >
    <View style={{ alignContent:"center",paddingTop:150, paddingLeft:5}}> 
    
      <Text style={{color: "black",  fontSize: 20, margin:10,  }}> {"Let's get you started!\n Hobbyist needs some information\n to find activities best suited for\n you."}</Text>
      <Text style={{color: "black",  fontSize: 15, margin:10,  }}> {'\u25CF   Tell us your hobbies'}</Text>
      <Text style={{color: "black",  fontSize: 15, margin:10,  }}> {'\u25CF   Join some forums'}</Text>
      <Text style={{color: "black",  fontSize: 15, margin:10,  }}> {'\u25CF   Turn on location'}</Text> 
      
     
      <View style={[{ width: "40%", margin: 10}]}>
      

        {/* add test for setup screen                    */}
        <TouchableOpacity style={ styles.button }
                         //onPress={SetupScreen}
                         onPress={() => navigation.navigate(SetupScreen1)}
                    >
                        <Text style = { styles.buttonContent }> Next </Text>
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
            width: '75%',
            height: 45,
            backgroundColor: 'black',
            paddingVertical: 12,
            borderRadius: 30,
            marginLeft:230,
            marginTop: 150,
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
        })
  
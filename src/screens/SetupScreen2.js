import {View, Text, ImageBackground, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import SetupScreen1 from './SetupScreen1';
import PlacesScreen from './PlacesScreen.js';

const image = {uri: 'https://img.freepik.com/premium-vector/various-hobbies-icons-selection-white-background-vector_532963-598.jpg?w=1380'};

export default function SetupScreen2({ navigation }) {
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    
    <ScrollView style={{backgroundColor:'rgba(255,255,255,0.9)'}} >
    {/* <ScrollView style={{backgroundColor: "white"}}> */}
    <View style={{ alignContent:"center",paddingTop:20, paddingLeft:5}}> 
    
      <Text style={{color: "black",  fontSize: 20, margin:10, }}>{'Last step! Join some communities\nand get chatting!'}</Text>

      <View style={{ alignContent:"center",paddingTop:50, paddingLeft:5}}> 

      <View style={styles.body}> 
 
<Text>   
      <Text style={{color: "black",  fontSize: 15, padding:5, fontWeight:"bold" }}>{' Hiking   '}</Text>
      <Text style={{color: "gray",  fontSize: 15, padding:5,}}>{'200 members\n A short description of\n the community'}</Text>
</Text>
      <TouchableOpacity style={ styles.buttonJoin }
                         
                         onPress={() => navigation.navigate(PlacesScreen)}
                    >
                        <Text style = { styles.buttonContentJoin }> Join </Text>
                    </TouchableOpacity>
      </View>

      <View style={styles.body}>  
         
<Text>   
      <Text style={{color: "black",  fontSize: 15, padding:5, fontWeight:"bold" }}>{' Music   '}</Text>
      <Text style={{color: "gray",  fontSize: 15, padding:5,}}>{'350 members\n A short description of\n the community'}</Text>
</Text>
      <TouchableOpacity style={ styles.buttonJoin }
                         
                         onPress={() => navigation.navigate(PlacesScreen)}
                    >
                        <Text style = { styles.buttonContentJoin }> Join </Text>
                    </TouchableOpacity>
                    </View>
        <View style={styles.body}>              
<Text>   
      <Text style={{color: "black",  fontSize: 15, padding:5, fontWeight:"bold" }}>{' Movies   '}</Text>
      <Text style={{color: "gray",  fontSize: 15, padding:5,}}>{'400 members\n A short description of\n the community'}</Text>
</Text>
      <TouchableOpacity style={ styles.buttonJoin }
                         
                         onPress={() => navigation.navigate(PlacesScreen)}
                    >
                        <Text style = { styles.buttonContentJoin }> Join </Text>
                    </TouchableOpacity>
      </View>


      <View style={[{ width: "40%", margin: 10}]}>

        {/* add test for setup screen                    */}
        <TouchableOpacity style={ styles.button }
                         //onPress={SetupScreen}
                         onPress={() => navigation.navigate(SetupScreen1)}
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
          </View>
          </ScrollView> 
          </ImageBackground>

)
}
          
          const styles = StyleSheet.create({
            body: {
                //alignItems: 'center',
                //height: '50%',
                // backgroundColor: '#FFFFFF',
                //paddingVertical: 15,
                borderColor: "black", 
                borderWidth:1, 
                padding:5,
                marginRight:30,
                marginLeft:15,
                paddingBottom:20, 
                backgroundColor:'white'
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
            marginLeft:225,
            marginTop: 150,
        
        },
        buttonSkip: {
            alignItems: 'center',
            width: '75%',
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
        buttonJoin: {
            alignItems: 'center',
            width: '35%',
            height: 30,
            backgroundColor: 'royalblue',
            paddingVertical:5,
            borderRadius: 10,
            marginLeft:200,
            marginTop: -30,
            
            
        },
        buttonContentJoin: {
            color: 'white'
        },
        })
  
import {View, Text, ImageBackground, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import RoundButton from '../components/RoundButton';

const image = {uri: 'https://img.freepik.com/premium-vector/various-hobbies-icons-selection-white-background-vector_532963-598.jpg?w=1380'};

export default function SetupScreen1({ navigation }) {
  return (
    <ImageBackground source={image}>
        <View style={styles.container}> 
          <View style={styles.upper}>
            <Text style={{fontSize: 20}}>Let's get you started!</Text>
            <Text style={{fontSize: 20}}>Hobbyist needs some information to find activities best suited for you.</Text>
            <Text style={{fontSize: 20}}> {'\u25CF   Create a username'}</Text>
            <Text style={{fontSize: 20}}> {'\u25CF   Tell us your hobbies'}</Text>
            <Text style={{fontSize: 20}}> {'\u25CF   Set your location'}</Text> 
            <Text style={{fontSize: 20}}> {'\u25CF   Join some forums'}</Text>
          </View>
          <View style={styles.lower}>
            <RoundButton
              onPress={() => navigation.navigate("Set Up 2")}
              title="Next"
            />
            <RoundButton
              onPress={() => navigation.navigate("Nav Tabs")}
              title="Skip"
            />
          </View>
        </View> 
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.9)',
    height: '100%'
  },
  upper: {
    marginTop: '50%',
    rowGap: 12,
  },
  lower: {
      rowGap: 10,
      alignSelf: 'flex-end',
      paddingRight: 20,
      marginBottom: 20
  },
});
import {View, Text, ImageBackground, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import RoundButton from '../components/RoundButton';

const image = {uri: 'https://img.freepik.com/premium-vector/various-hobbies-icons-selection-white-background-vector_532963-598.jpg?w=1380'};

export default function SetupScreen2({ navigation }) {
  return (
    <ImageBackground source={image}>
      {/* <ScrollView style={{backgroundColor:'rgba(255,255,255,0.9)'}} > */}
        <View style={styles.container}> 
          <View style={styles.upper}>
          <Text style={{fontSize: 20}}>{'Type some hobbies you enjoy or\n are interested in.'}</Text>
          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Enter your hobbies'}
              style={styles.inputStyle}
            />
            <TouchableOpacity
              onPress={() => {}}
              style={styles.addButton}
            >
              <Text style={{color: '#FFF'}}>Add</Text>
            </TouchableOpacity>
          </View>
          </View>
          <View style={styles.lower}>
            <RoundButton
              onPress={() => navigation.navigate("Set Up 3")}
              title="Next"
            />
            <RoundButton
              onPress={() => {}}
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
    alignItems: 'center',
    rowGap: 12,
    marginTop: '50%'
  },
  lower: {
    rowGap: 10,
    alignSelf: 'flex-end',
    paddingRight: 20,
    marginBottom: 20
  },
  wrapper: {
    flexDirection: 'row',
    columnGap: 8
  },
  inputStyle: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderWidth: 2
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: 50,
    height: 40
  },
});
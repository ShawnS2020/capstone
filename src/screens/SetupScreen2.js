import { useState } from 'react';
import { observer, inject } from 'mobx-react';
import {View, Text, ImageBackground, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import RoundButton from '../components/RoundButton';
import { useGlobal } from '../state/GlobalContext';

const image = {uri: 'https://img.freepik.com/premium-vector/various-hobbies-icons-selection-white-background-vector_532963-598.jpg?w=1380'};

export default inject("dummyAccountStore")(observer(({ dummyAccountStore, navigation }) => {
  const { loadFeed } = useGlobal();
  const [input, setInput] = useState('');
  const [hobbies, setHobbies] = useState([]);

  function handleAddHobby() {
    if (input != '' && !hobbies.includes(input)) {
      setHobbies([...hobbies, input]);
      setInput('');
    }
  }

  function handleDeleteHobby(hobby) {
    setHobbies(hobbies.filter((h) => h != hobby));
  }

  function handleNextButtonClick() {
    dummyAccountStore.changeHobbies(hobbies);
    loadFeed();
    navigation.navigate("Setup 3");
  }

  function handleSkipButtonClick() {
    navigation.navigate("Nav Tabs");
  }

  return (
    <ImageBackground source={image}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.upper}>
            <Text style={{fontSize: 20}}>{'Type some hobbies you enjoy or\n are interested in.'}</Text>
            <View style={styles.wrapper}>
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder={'Enter your hobbies'}
                style={styles.inputStyle}
              />
              <TouchableOpacity
                onPress={handleAddHobby}
                style={styles.addButton}
              >
                <Text style={{color: '#FFF'}}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.hobbiesContainer}>
            {hobbies.map((hobby, i) => {
              return (
                <View key={i}  style={styles.hobbyWrapper}>
                  <Text style={styles.hobbyText}>{hobby}</Text>
                  <TouchableOpacity
                    onPress={() => handleDeleteHobby(hobby)}
                    style={styles.deleteButton}
                  >
                    <Text style={{color: '#FFF'}}>X</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <View style={styles.lower}>
            <RoundButton
              onPress={handleNextButtonClick}
              title="Next"
            />
            <RoundButton
              onPress={handleSkipButtonClick}
              title="Skip"
            />
          </View> 
      </ScrollView>
    </ImageBackground>
  );
}));

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    height: '100%'
  },
  contentContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
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
    backgroundColor: '#000',
    width: 50,
    height: 40
  },
  hobbiesContainer: {
    flex: 1,
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  hobbyWrapper: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  hobbyText: {
    marginHorizontal: 8,
    minWidth: '25%',
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    width: 32,
    height: 32
  }
});
import {View, Text, ImageBackground, StyleSheet, Image} from 'react-native';
import SubforumRecommendation from '../components/SubforumRecommendation';
import RoundButton from '../components/RoundButton';

const image = {uri: 'https://img.freepik.com/premium-vector/various-hobbies-icons-selection-white-background-vector_532963-598.jpg?w=1380'};

export default function SetUpScreen3({ navigation }) {
  function handleNextButtonClick() {
    navigation.navigate("Nav Tabs");
  }

  function handleSkipButtonClick() {
    navigation.navigate("Nav Tabs");
  }

  return (
    <ImageBackground source={image}>
      <View style={styles.container}> 
        <Text style={{fontSize: 20, marginTop: '10%', }}>Last step! Join some communities and get chatting!</Text>
        <View style={{ alignContent:"center" }}> 
          <SubforumRecommendation
            title="Hiking"
            numMembers={200}
          />
          <SubforumRecommendation
            title="Music"
            numMembers={350}
          />
          <SubforumRecommendation
            title="Movies"
            numMembers={400}
          />
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
    </View> 
    </ImageBackground>
    );
}
          
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.9)',
    height: '100%',
    padding: 20
  },
  lower: {
    rowGap: 10,
    alignSelf: 'flex-end',
  },
  headerWrapper: {
    flexDirection: 'row',
    columnGap: 8
  },
});
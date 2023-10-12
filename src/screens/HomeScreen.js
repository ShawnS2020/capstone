import { View, Text, Button } from 'react-native';
import { observer } from 'mobx-react';

function HomeScreen({ navigation, route }) {
  const { counterScreenStore, dummyAccountStore } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{dummyAccountStore.username}</Text>
      <Text>{counterScreenStore.counter}</Text>
      <Button
        onPress={() => navigation.navigate('Counter')}
        title="To Counter Screen"
      />
      <Button
        onPress={() => navigation.navigate('Location')}
        title="To Location Screen"
      />
      <Button
        onPress={() => navigation.navigate('ActivityScreen')}
        title="To Activity Screen"
      />      
    </View>
  );
}

export default observer(HomeScreen);
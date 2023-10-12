import { View, Text, Button } from 'react-native';
import { observer } from 'mobx-react';

function HomeScreen({ navigation, route }) {
  const { counterScreenStore } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{counterScreenStore.counter}</Text>
      <Button
        onPress={() => navigation.navigate('Test')}
        title="To Test Screen"
      />
      <Button
        onPress={() => navigation.navigate('Location')}
        title="To Location Screen"
      />
    </View>
  );
}

export default observer(HomeScreen);
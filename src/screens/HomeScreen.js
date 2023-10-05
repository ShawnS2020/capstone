import * as React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        onPress={() => navigation.navigate('Test')}
        title="To Test Screen"
      />
      
      <Button
        onPress={() => navigation.navigate('Diondre')}
        title="To Diondre's screen"
      />
    </View>
  );
}
import * as React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Test')}
        title="To Test Screen"
      />
      <Button
        onPress={() => navigation.navigate('Forum Hub')}
        title="To Forums"
      />
    </View>
  );
}
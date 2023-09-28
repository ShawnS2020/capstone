import { View, Text, Button } from 'react-native';
import MyComponent from '../components/MyComponent';

export default function TestScreen({ navigation }) {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Test Screen</Text>
            <Button
              onPress={() => navigation.navigate('Home')}
              title="To Home Screen"
            />
            <MyComponent />
        </View>
    )
}
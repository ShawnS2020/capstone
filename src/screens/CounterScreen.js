import { View, Button, TextInput } from 'react-native';
import MyComponent from '../components/MyComponent';

export default function TestScreen({ navigation, route }) {
    const { counterScreenStore } = route.params;

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
              onPress={() => navigation.navigate('Home')}
              title="To Home Screen"
            />
            <MyComponent counterScreenStore={counterScreenStore} />
        </View>
    )
}
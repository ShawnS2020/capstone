import { StyleSheet, View, Text, Button } from 'react-native';
import { observer } from 'mobx-react';

function MyComponent({ counterScreenStore }) {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>My Component</Text>
            <Button
                onPress={ () => counterScreenStore.incrementCounter() }
              title="Click Me"
            />
            <Text style={styles.text}>{ counterScreenStore.counter }</Text>
        </View>
    )
}

export default observer(MyComponent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#20B070',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 20
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
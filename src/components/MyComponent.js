import { StyleSheet, View, Text, Button } from 'react-native';
import { useState } from 'react';

export default function MyComponents() {
    // The convention is to name state variables like [something, setSomething] using array destructuring.
    // The parameter in useState is the initial value of the state variable.
    const [counter, setCounter] = useState(0)
    // The function passes to the onPress prop of the Button component.
    function handleClick() {
        setCounter(counter + 1)
    }

    // This is the JSX that will be rendered.
    return(
        <View style={styles.container}>
            <Text style={styles.text}>My Component</Text>
            <Button
              onPress={ handleClick }
              title="Click Me"
            />
            <Text style={styles.text}>{counter}</Text>
        </View>
    )
}

// This is the CSS for the component.
// There is styles for the container and text.
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
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function RoundButton({ title, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.roundButton}
        >
            <Text style={{color: '#FFF'}}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  roundButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: 100,
    height: 40,
    borderRadius: 30,
  }
});
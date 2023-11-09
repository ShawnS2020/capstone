import { Text, TextInput, FlatList, View, Button, StyleSheet, Image, Switch } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function StarRating({rating}) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        let iconName = "star-o";
        if (rating >= i + 0.7) {
            iconName = "star";
        } else if (rating >= i + 0.3) {
            iconName = "star-half-o";
        }
        stars.push(<FontAwesome name={iconName} size={16} color="#FBBC04" />)
    }

    return (
        <View style={{ flexDirection: 'row', marginHorizontal: 4 }}>
            {stars}
        </View>
    );
}


export default function Thread({ navigation }) {

    //placeholder return
    return(
        <View style={ styles.container }>
            <FlatList
                ref = { flatListRef }
                style = {{ flex: 1, backgroundColor: "#C0C0C0" }}
                contentContainerStyle={ styles.body }
                data={texts}
                // data={ txt }
                renderItem={ ({ item }) => (
                    <Text style={ styles.bodyText }>{ item }</Text>
                )}
                onContentSizeChange={handleContentSizeChange}
            />
            </View>
            )
}
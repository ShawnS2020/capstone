import {View, Image, Text, Button, ScrollView} from 'react-native';



export default function ActivityScreen({ navigation }) {
  return (
    <ScrollView>
    <View style={{backgroundColor: "white"}}> 
      <Image
        source={{uri: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGlraW5nfGVufDB8fDB8fHww&w=1000&q=80'}}
        style={{width: 400, height: 300}}
      />
      <Text style={{color: "black",  fontSize: 15, margin:10, fontWeight: "bold" }}>Hiking</Text>
      <View style={[{ width: "40%", margin: 10}]}>
            <Button style={[{ borderRadius: 50}]}
              color="black" //change the button color
              onPress={() => navigation.navigate('Home')}
              title="Upcoming"
            />
            </View>
            <View style={[{ width: "40%", marginHorizontal: 190, marginVertical:-45}]}>
            <Button style={{borderRadius: 10}}
              color="black" //change the button color
              onPress={() => navigation.navigate('Home')}
              title="Forums"
            />
            </View>

            <View style={[{ width: "40%", marginHorizontal: 10, marginTop: 50, marginBottom: 20}]}>
            <Button
              color="black" //change the button color
              onPress={() => navigation.navigate('Home')}
              title="Locations"
            />
            </View>
          
            <Image
            source={{uri:'https://edenvaleinn.com/wp-content/uploads/2019/04/eden-vale-woman-kayaking.jpeg'}}
            style={{width: 400, height: 300}}
            />
            <Text style={{color: "black",  fontSize: 15, margin:10, fontWeight: "bold" }}>Kayaking</Text>
           <View style={[{ width: "40%", margin: 10}]}>
            <Button style={[{ borderRadius: 50}]}
              color="black" //change the button color
              onPress={() => navigation.navigate('Home')}
              title="Upcoming"
            />
            </View>
            <View style={[{ width: "40%", marginHorizontal: 190, marginVertical:-45}]}>
            <Button style={{borderRadius: 10}}
              color="black" //change the button color
              onPress={() => navigation.navigate('Home')}
              title="Forums"
            />
            </View>

            <View style={[{ width: "40%", marginHorizontal: 10, marginTop: 50, marginBottom: 20}]}>
            <Button
              color="black" //change the button color
              onPress={() => navigation.navigate('Home')}
              title="Locations"
            />
            </View>


            <Image
            source={{uri:'https://www.sydney.com/sites/sydney/files/styles/landscape_992x558/public/2023-05/Camping.jpg?h=cbd0a714&itok=lee0djuv'}}
            style={{width: 400, height: 300}}
            />
            <Text style={{color: "black",  fontSize: 15, margin:10, fontWeight: "bold" }}>Camping</Text>
           <View style={[{ width: "40%", margin: 10}]}>
            <Button style={[{ borderRadius: 50}]}
              color="black" //change the button color
              onPress={() => navigation.navigate('Home')}
              title="Upcoming"
            />
            </View>
            <View style={[{ width: "40%", marginHorizontal: 190, marginVertical:-45}]}>
            <Button style={{borderRadius: 10}}
              color="black" //change the button color
              onPress={() => navigation.navigate('Home')}
              title="Forums"
            />
            </View>

            <View style={[{ width: "40%", marginHorizontal: 10, marginTop: 50, marginBottom: 20}]}>
            <Button
              color="black" //change the button color
              onPress={() => navigation.navigate('Home')}
              title="Locations"
            />
            </View>
          </View> 
          
          </ScrollView> 
          
  )
  }
    
 

 

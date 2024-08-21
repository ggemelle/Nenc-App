import * as React from "react";
import { Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import logoImage from "./assets/logoNenc.png"


function HomeScreen({navigation}){
  return (
    <View style={styles.planoDeFundo}>
      <TouchableOpacity onPress={() => navigation.navigate('NextScreen')}>
        <Image style={styles.logoIcon} resizeMode="cover" source={logoImage} />
      </TouchableOpacity>
    </View>
  );
};

function NextScreen(){
  return (
    <View style={stylesNextScreen.container}>
      <Text style={stylesNextScreen.text}>Esta é a próxima tela!</Text>
    </View>
  );
};


const Stack = createNativeStackNavigator();
const myApp = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NextScreen" component={NextScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

};

const styles = StyleSheet.create({
  logoIcon: {
    width: 480,
    height: 480,
    transform: [
      {
        rotate: "90deg"
      }
    ]
  },
  planoDeFundo: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems:"center",
    justifyContent: "center"
  }
});

const stylesNextScreen = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default myApp;

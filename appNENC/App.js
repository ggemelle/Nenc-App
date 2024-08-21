import * as React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import logoImage from "./assets/logoNenc.png";
import SecondScreen from './secondScreen.js';
import TerceiraTela from "./terceiraTela.js";
import QuartaTela from "./quartaTela.js";

function HomeScreen({navigation}){
  return (
    <View style={styles.planoDeFundo}>
      <TouchableOpacity onPress={() => navigation.navigate('SecondScreen')}>
        <Image style={styles.logoIcon} resizeMode="cover" source={logoImage} />
      </TouchableOpacity>
    </View>
  );
};

const Stack = createNativeStackNavigator();
const MyApp = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SecondScreen" component={SecondScreen} />
        <Stack.Screen name="TerceiraTela" component={TerceiraTela} options={{ headerShown: false }} />
        <Stack.Screen name="QuartaTela" component={QuartaTela} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );

};

const styles = StyleSheet.create({
  logoIcon: {
    width: 480,
    height: 480
  },
  planoDeFundo: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems:"center",
    justifyContent: "center"
  }
});

export default MyApp;
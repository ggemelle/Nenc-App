import * as React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import logoImage from "./assets/logoNenc.png";
import SecondScreen from './pages/secondScreen.js';
import TerceiraTela from "./pages/terceiraTela.js";
import QuartaTela from "./pages/quartaTela.js";
import FiveScreen from "./pages/fiveScreen.js";
import SixScreen from "./pages/sixScreen.js";
import SevenScreen from "./pages/sevenScreen.js";
import TelaOito from "./pages/telaOito.js";
import NonaTela from "./pages/nonaTela.js";
import TelaDez from "./pages/telaDez.js";
import ScreenOnze from "./pages/screenOnze";
import ScreenDoze from "./pages/screenDoze";

function HomeScreen({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('SecondScreen')}>
      <View style={styles.planoDeFundo}>
        <Image style={styles.logoIcon} resizeMode="cover" source={logoImage} />
      </View>
    </TouchableOpacity>
  );
};

const Stack = createNativeStackNavigator();
const MyApp = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SecondScreen" component={SecondScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TerceiraTela" component={TerceiraTela} options={{ headerShown: false }} />
        <Stack.Screen name="QuartaTela" component={QuartaTela} options={{ headerShown: false }} />
        <Stack.Screen name="FiveScreen" component={FiveScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SixScreen" component={SixScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SevenScreen" component={SevenScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TelaOito" component={TelaOito} options={{ headerShown: false }} />
        <Stack.Screen name="NonaTela" component={NonaTela} options={{ headerShown: false }} />
        <Stack.Screen name="TelaDez" component={TelaDez} options={{ headerShown: false }} />
        <Stack.Screen name="ScreenOnze" component={ScreenOnze} options={{ headerShown: false }} />
        <Stack.Screen name="ScreenDoze" component={ScreenDoze} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );

};

const styles = StyleSheet.create({
  logoIcon: {
    width: 480,
    height: 480,
    top: -50,
  },
  planoDeFundo: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default MyApp;
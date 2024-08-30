import * as React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import logoImage from "./assets/logoNenc.png";
import TelaDois from "./pages/telaDois.js";
import TelaTres from "./pages/telaTres.js";
import TelaQuatro from "./pages/telaQuatro.js";
import TelaCinco from "./pages/telaCinco.js";
import TelaSeis from "./pages/telaSeis.js";
import TelaSete from "./pages/telaSete.js";
import TelaOito from "./pages/telaOito.js";
import TelaNove from "./pages/telaNove.js";


function HomeScreen({ navigation }) {
  navigation.navigate('TelaDois')
  return (
    <TouchableOpacity onPress={() => navigation.navigate('TelaDois')}>
      <View style={styles.planoDeFundo}>
        <Image style={styles.logoIcon} resizeMode="cover" source={logoImage} />
        <Text style={styles.text}>Clique ao centro da tela para começar a jogar</Text>
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
        <Stack.Screen name="TelaDois" component={TelaDois} options={{ headerShown: false }} />
        <Stack.Screen name="TelaTres" component={TelaTres} options={{ headerShown: false }} />
        <Stack.Screen name="TelaQuatro" component={TelaQuatro} options={{ headerShown: false }} />
        <Stack.Screen name="TelaCinco" component={TelaCinco} options={{ headerShown: false }} />
        <Stack.Screen name="TelaSeis" component={TelaSeis} options={{ headerShown: false }} />
        <Stack.Screen name="TelaSete" component={TelaSete} options={{ headerShown: false }} />
        <Stack.Screen name="TelaOito" component={TelaOito} options={{ headerShown: false }} />
        <Stack.Screen name="TelaNove" component={TelaNove} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );

};

const styles = StyleSheet.create({
  logoIcon: {
    width: 480,
    height: 480,
  
  },
  planoDeFundo: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

  text: {
    width: 480,
    height: 480,
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    top: -100,
    fontWeight: "bold"
  }
});

export default MyApp;
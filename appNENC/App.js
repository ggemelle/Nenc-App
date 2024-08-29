import * as React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import logoImage from "./assets/logoNenc.png";
import PageDois from "./pages/pageDois.js";
import PageTres from "./pages/pageTres.js";
import PageQuatro from "./pages/pageQuatro.js";
import PageCinco from "./pages/pageCinco.js";
import PageSeis from "./pages/pageSeis.js";
import PageSete from "./pages/pageSete.js";
import PageOito from "./pages/pageOito.js";
import ScreenFeature from "./pages/sceenFeature.js";
import FlagPageCinco from "./pages/flagPageCinco.js";

function HomeScreen({ navigation }) {
  navigation.navigate('PageDois')
  return (
    <TouchableOpacity onPress={() => navigation.navigate('PageDois')}>
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
        <Stack.Screen name="PageDois" component={PageDois} options={{ headerShown: false }} />
        <Stack.Screen name="PageTres" component={PageTres} options={{ headerShown: false }} />
        <Stack.Screen name="PageQuatro" component={PageQuatro} options={{ headerShown: false }} />
        <Stack.Screen name="PageCinco" component={PageCinco} options={{ headerShown: false }} />
        <Stack.Screen name="PageSeis" component={PageSeis} options={{ headerShown: false }} />
        <Stack.Screen name="PageSete" component={PageSete} options={{ headerShown: false }} />
        <Stack.Screen name="PageOito" component={PageOito} options={{ headerShown: false }} />
        <Stack.Screen name="ScreenFeature" component={ScreenFeature} options={{ headerShown: false }} />
        <Stack.Screen name="FlagPageCinco" component={FlagPageCinco} options={{ headerShown: false }} />
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
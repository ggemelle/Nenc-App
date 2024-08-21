import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import logoImage from "./assets/logoNenc.png"

const myApp = () => {

  return (
    <View style={styles.planoDeFundo}>
      <Image style={styles.logoIcon} resizeMode="cover" source={logoImage} />
    </View>);
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

export default myApp;

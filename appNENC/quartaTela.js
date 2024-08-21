import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

const QuartaTela = () => {
  return (
    <View style={styles.container}>
      <Text>Quarta Tela</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default QuartaTela;
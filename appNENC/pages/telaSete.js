import * as React from "react";
import { StyleSheet, View, Image } from "react-native";
import Logo from "../assets/ollaLogo.png";
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const TelaSete = ({ route }) => {
  const navigation = useNavigation();
  const { count, data } = route.params || { count: 0, data: [] }; // Recebe o count e os dados acumulados

  useFocusEffect(
    React.useCallback(() => {
      const timeoutId = setTimeout(() => {
        navigation.navigate('TelaOito', { count, data }); // Passa o count e os dados acumulados de volta para TelaOito
      }, 1000);

      return () => clearTimeout(timeoutId);
    }, [navigation, count, data])
  );

  return (
    <View style={styles.page3}>
      <Image style={styles.logo} resizeMode="contain" source={Logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  page3: {
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    height: 640,
    overflow: "hidden"
  },
  logo: {
    width: 300,
    height: 300,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -150 }],
  },
});

export default TelaSete;

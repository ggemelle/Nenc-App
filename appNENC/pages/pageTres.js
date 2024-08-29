import * as React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Video } from 'expo-av';
import Logo from "../assets/ollaLogo.png";
import VideoSource from "../assets/comercial.mp4";
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const PageTres = () => {
  const [mediaType, setMediaType] = React.useState('image');
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const timeoutId = setTimeout(() => {
        navigation.navigate('PageCinco');
      }, 1000);

      return () => clearTimeout(timeoutId);
    }, [navigation])
  );

  return (
    <View style={styles.page3}>
      <Image style={styles.logo} resizeMode="contain" source={Logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    top: 285,
    left: 610,
    borderRadius: 20,
    backgroundColor: "#7834c4",
    height: 40,
    width: 100,
  },
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

export default PageTres;

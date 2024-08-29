import * as React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Video } from 'expo-av'; // Certifique-se de ter o pacote expo-av instalado
import Logo from "../assets/ollaLogo.png";
import VideoSource from "../assets/comercial.mp4";
import { useNavigation } from '@react-navigation/native'; // Importa o hook de navegação


const PageTres = () => {
  const [mediaType, setMediaType] = React.useState('image');
  const navigation = useNavigation(); // Instancia o hook de navegação

  React.useEffect(() => {
    // Lógica para navegar para a próxima tela após um tempo
    const timeoutId = setTimeout(() => {
<<<<<<< HEAD
      navigation.navigate('FlagPageCinco'); // Substitua 'PageQuatro' pelo nome da sua próxima tela
=======
      navigation.navigate('PageCinco'); // Substitua 'PageQuatro' pelo nome da sua próxima tela
>>>>>>> 779b8eb7b7d39710e4d89d57252a8d804b7801df
    }, 1000); // 5000ms = 5 segundos

    return () => clearTimeout(timeoutId); // Limpa o timeout se o componente for desmontado ou se a mídia for alterada
  }, [navigation]);

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
  //comercial: {
    //left: 0,
    //top: 8,
    //fontSize: 15,
    //fontWeight: "700",
    //fontFamily: "Inter-Bold",
    //color: "#fff",
    //textAlign: "center",
    //height: 30
  //},
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
    position: 'absolute',  // Certifique-se de que a imagem usa position absolute
    top: '50%',            // Centraliza verticalmente
    left: '50%',           // Centraliza horizontalmente
    transform: [{ translateX: -150 }, { translateY: -150 }], // Ajusta o centro para o meio da imagem
  },
  
  video: {
    width: 465,
    height: 465,
    top: -138,
    left: 125
  }
});

export default PageTres;

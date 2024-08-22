import * as React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useNavigation } from '@react-navigation/native'; // Importe o hook

const TerceiraTela = () => {

  const navigation = useNavigation(); // Utilize o hook para acessar a navigation

  // Define um timeout para ir para a próxima tela após 25 segundos
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.navigate('QuartaTela');
    }, 25000); // 25000 milissegundos = 25 segundos

    // Limpa o timeout quando o componente é desmontado
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={300}
        play={true}
        videoId={"TADdQQJJ7m0"} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
  },
});

export default TerceiraTela;
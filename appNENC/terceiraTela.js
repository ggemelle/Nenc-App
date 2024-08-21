import * as React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const TerceiraTela = ({ navigation }) => {

    const handleVideoEnded = () => {
        // Use Alert para exibir uma mensagem de teste
        Alert.alert('Vídeo finalizado!', 'Navegando para a próxima tela...', [
          { text: 'OK', onPress: () => navigation.navigate('QuartaTela') } // Navega para QuartaTela após clicar em OK
        ]);
      };

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={300}
        play={true}
        videoId={"0YJjzvDUbk0"} // Substitua pelo ID do vídeo do YouTube
        onEnd={handleVideoEnded} // Chame handleVideoEnded quando o vídeo terminar
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
import * as React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import maoEsquerda from './assets/maoEsquerda.png';
import maoDireita from './assets/maoDireita.png';
import somenteLogo from './assets/somenteLogo.png';

const QuartaTela = ({ navigation }) => {

  const handleMaoEsquerdaPress = () => {
      navigation.navigate('FiveScreen'); // Substitua 'QuintaTela' pelo nome da sua próxima tela
  };

  const handleMaoDireitaPress = () => {
      navigation.navigate('FiveScreen'); // Substitua 'QuintaTela' pelo nome da sua próxima tela
  };

  return (
      <View style={styles.quartaTela}>
          <Image style={styles.logo} resizeMode="contain" source={somenteLogo} />
          <Text style={styles.qualAMo}>
              Qual a mão que você costuma realizar tarefas diárias, como escovar os dentes, pentear o cabelo, escrever, mexer no mouse, etc?
          </Text>
          <View style={styles.imagensContainer}>
              <TouchableOpacity onPress={handleMaoEsquerdaPress} style={styles.maoEsquerdaIconContainer}>
                  <Image style={styles.maoEsquerdaIcon} resizeMode="contain" source={maoEsquerda} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleMaoDireitaPress} style={styles.maoDireitaIconContainer}>
                  <Image style={styles.maoDireitaIcon} resizeMode="contain" source={maoDireita} />
              </TouchableOpacity>
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
    quartaTela: {
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    qualAMo: {
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        color: "#000",
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    imagensContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    maoEsquerdaIcon: {
        width: 150,
        height: 150,
    },
    maoDireitaIcon: {
        width: 150,
        height: 150,
    },
});

export default QuartaTela;

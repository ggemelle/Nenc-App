import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import maoEsquerda from './assets/maoEsquerda.png';
import maoDireita from './assets/maoDireita.png';
import somenteLogo from './assets/somenteLogo.png';

const QuartaTela = () => {

    return (
        <View style={styles.quartaTela}>
            <Image style={[styles.logo, styles.qualAMoPosition]} resizeMode="cover" source={somenteLogo} />
            <Image style={[styles.maoDireitaIcon, styles.removebgIconLayout]} resizeMode="cover" source={maoDireita} />
            <Image style={[styles.maoEsquerdaIcon, styles.removebgIconLayout]} resizeMode="cover" source={maoEsquerda} />
            <Text style={[styles.qualAMo, styles.qualAMoPosition]}>{`Qual a mão que você costuma realizar tarefas diárias, como escovar os dentes, pentear o cabelo, escrever, mexer no mouse, etc?`}</Text>
        </View>);
};

const styles = StyleSheet.create({
    removebgIconLayout: {
        height: 150,
        width: 150,
        top: 164,
        position: "absolute",
        transform: [
            {
                rotate: "90deg"
            }
        ]
    },
    qualAMoPosition: {
        position: "absolute",
        transform: [
            {
                rotate: "90deg"
            }
        ]
    },
    maoDireitaIcon: {
        left: -493
    },
    maoEsquerdaIcon: {
        left: -297
    },
    logo: {
        top: 310,
        left: -50,
        width: 50,
        height: 50
    },
    qualAMo: {
        top: 618,
        left: 36,
        fontSize: 18,
        fontWeight: "600",
        fontFamily: "Inter-SemiBold",
        color: "#000",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 596,
        height: 144
    },
    quartaTela: {
        backgroundColor: "#fff",
        flex: 1,
        width: "100%",
        height: 640,
        overflow: "hidden",
        transform: [
            {
                rotate: "90deg"
            }
        ]
    }
});

export default QuartaTela;

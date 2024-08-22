import * as React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import somenteLogo from './assets/somenteLogo.png';
import arrowImg from './assets/Arrow.png';

const FiveScreen = ({ navigation }) => {

    return (
        <View style={styles.planoDeFundo}>
            <Image style={styles.logo} resizeMode="cover" source={somenteLogo} />
            <Text style={styles.naPesquisaDe}>
                Bem-vindo ao jogo da identificação de palavras!{"\n\n"}
                Seu objetivo é responder o mais rápido possível. Aqui está o que você deve fazer:{"\n"}
                Quando aparecer "SIM," aperte o botão SIM.{"\n"}
                Quando aparecer "NÃO," aperte o botão NÃO.{"\n\n"}
                Seja rápido! Erros podem acontecer, mas tente não cometer muitos. Se você pressionar a tecla errada, ouvirá um bipe.{"\n\n"}
                Quando estiver pronto para começar, pressione INICIAR.
            </Text>

            <TouchableOpacity style={styles.botaoIniciar} onPress={() => navigation.navigate('SixScreen')}>
                <Text style={styles.iniciar}>INICIAR</Text>
            </TouchableOpacity>
            <View style={styles.cliqueParaIniciar}>
                <Text style={styles.cliqueParaIniciarText}>Clique para iniciar</Text>
                <Image style={styles.arrow} resizeMode="cover" source={arrowImg} />
            </View>
        </View>);
};

const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        marginBottom: 0,
    },
    naPesquisaDe: {
        fontSize: 14,
        width: '100%',
        height: 180,
        color: "#000",
        textAlign: "center",
        fontFamily: "Inter-SemiBold",
        fontWeight: "700",
        marginBottom: 0,
    },
    botaoIniciar: {
        backgroundColor: "#37adbd",
        width: '40%',
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
    },
    iniciar: {
        fontSize: 20,
        color: "#fff",
        textAlign: "center",
        fontFamily: "Inter-SemiBold",
        fontWeight: "600",
    },
    cliqueParaIniciar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    cliqueParaIniciarText: {
        fontSize: 14,
        color: "#000",
        textAlign: "center",
        fontFamily: "Inter-SemiBold",
        fontWeight: "600",
        marginRight: 10,
    },
    arrow: {
        width: 20,
        height: 20,
        opacity: 0.8,
    },
    planoDeFundo: {
        backgroundColor: "#fff",
        flex: 1,
        padding: 20,
        alignItems:"center",
        justifyContent: "center"
    }
});

export default FiveScreen;
import * as React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import somenteLogo from './assets/somenteLogo.png';
import arrowImg from './assets/Arrow.png';

const NonaTela = ({ navigation }) => {

    return (
        <View style={styles.planoDeFundo}>
            <Image style={styles.logo} resizeMode="cover" source={somenteLogo} />
            <Text style={styles.naPesquisaDe}>
            Este teste avalia o quanto você concorda ou discorda das combinações apresentadas.{"\n\n"}
            Você verá uma combinação de imagem e palavra na tela. Sua tarefa é arrastar as palavras rapidamente para SIM ou NÃO, conforme o que você achar mais adequado.{"\n\n"}
            Avalie com atenção e seja rápido!
            </Text>

            <TouchableOpacity style={styles.botaoIniciar} onPress={() => navigation.navigate('TelaDez')}>
                <Text style={styles.iniciar}>CONTINUAR</Text>
            </TouchableOpacity>
            <View style={styles.cliqueParaIniciar}>
                <Text style={styles.cliqueParaIniciarText}>Clique para continuar</Text>
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
        fontSize: 15,
        width: '100%',
        height: 180,
        color: "#000",
        textAlign: "center",
        fontFamily: "Inter-SemiBold",
        fontWeight: "700",
        marginBottom: 0,
        top: 20
    },
    botaoIniciar: {
        backgroundColor: "#37adbd",
        width: '40%',
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
        top: -15
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
        marginBottom: 20,
        top: -15
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

export default NonaTela;
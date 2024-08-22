import * as React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import somenteLogo from './assets/somenteLogo.png';
import arrowImg from './assets/Arrow.png';

const SevenScreen = ({ navigation }) => {

    return (
        <View style={styles.planoDeFundo}>
            <Image style={styles.logo} resizeMode="cover" source={somenteLogo} />
            <Text style={styles.naPesquisaDe}>
            Ótimo trabalho, você está rápido!{"\n\n"}
            Agora, vamos repetir a tarefa, mas com uma pequena mudança. Desta vez, algumas combinações de imagem e palavras aparecerão na tela antes das palavras "SIM" ou "NÃO".{"\n\n"}
            Sua tarefa: Ignore as combinações de imagem e palavras e responda somente às palavras "SIM" ou "NÃO", como fez anteriormente.{"\n\n"}
            Quando estiver pronto para continuar, aperte CONTINUAR.
            </Text>

            <TouchableOpacity style={styles.botaoIniciar} onPress={() => navigation.navigate('TelaOito')}>
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
        marginBottom: 20,
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

export default SevenScreen;
import * as React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import somenteLogo from '../assets/somenteLogo.png';
import arrowImg from '../assets/Arrow.png';

const PageDois = ({ navigation }) => {

    return (
        <View style={styles.planoDeFundo}>
            <Image style={styles.logo} resizeMode="cover" source={somenteLogo} />
            <Text style={styles.naPesquisaDe}>
                Na pesquisa de hoje, você será convidado(a) a avaliar uma marca de preservativos.{"\n"}
                Para isso, participará de uma tarefa simples em formato de jogo: palavras aparecerão na tela e irão descer rapidamente.{"\n"}
                Seu objetivo é arrastar cada palavra até o botão "SIM" ou "NÃO" o mais rápido possível.{"\n"}
                Antes de iniciar, será exibida uma imagem ou propaganda da marca Olla. Por favor, assista com atenção.{"\n\n"}
                Quando estiver pronto(a) para continuar, clique em "INICIAR".
            </Text>

            <TouchableOpacity style={styles.botaoIniciar} onPress={() => navigation.navigate('PageQuatro')}>
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
        width: 70,
        height: 70,
        marginBottom: 10,
    },
    naPesquisaDe: {
        fontSize: 15,
        width: '100%',
        height: 150,
        color: "#000",
        textAlign: "center",
        fontFamily: "Inter-SemiBold",
        fontWeight: "700",
        marginBottom: 10,
    },
    botaoIniciar: {
        backgroundColor: "#37adbd",
        width: '40%',
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
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

export default PageDois;
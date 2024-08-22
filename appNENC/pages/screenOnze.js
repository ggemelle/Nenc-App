import * as React from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native'; // Assumindo que você está usando React Navigation
import somenteLogo from '../assets/somenteLogo.png';
import Like from '../assets/like.png';
import Deslike from '../assets/deslike.png';
import Send from '../assets/send.png';

const ScreenOnze = () => {
    const navigation = useNavigation(); // Hook para navegar entre as telas

    const handlePress = () => {
        navigation.navigate('ScreenDoze'); // Substitua 'ProximaPagina' pelo nome da página de destino
    };

    return (
        <TouchableOpacity style={styles.planoDeFundo} onPress={handlePress} activeOpacity={1}>
            <Image style={styles.logo} resizeMode="cover" source={somenteLogo} />
            <View style={styles.iconContainer}>
                <Image style={styles.like} resizeMode="cover" source={Like} />
                <Image style={styles.deslike} resizeMode="cover" source={Deslike} />
                <View style={styles.textBoxContainer}>
                    <View style={styles.caixaDeTexto} />
                    <Image style={styles.sendIcon} resizeMode="cover" source={Send} />
                    <Text style={styles.digiteSuaMensagem}>Digite sua mensagem aqui...</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    planoDeFundo: {
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
        top: -15,
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 20,
    },
    like: {
        height: 140,
        width: 140,
        left: 150,
        top: -75,
    },
    deslike: {
        height: 140,
        width: 140,
        left: 280,
        top: -75,
    },
    textBoxContainer: {
        width: "100%",
        position: "relative",
        alignItems: "center",
        marginTop: "auto",
        marginBottom: 20,
    },
    sendIcon: {
        width: 40,
        height: 40,
        position: "absolute",
        bottom: -30,
        right: 385,
    },
    digiteSuaMensagem: {
        fontSize: 12,
        textTransform: "uppercase",
        fontFamily: "Amiri-Regular",
        color: "#454545",
        textAlign: "left",
        width: "90%",
        position: "absolute",
        top: 40,
        left: -190,
    },
    caixaDeTexto: {
        borderRadius: 15,
        backgroundColor: "rgba(217, 217, 217, 0.7)",
        width: "75%",
        height: 150,
        top: 30,
        left: -290,
    },
});

export default ScreenOnze;

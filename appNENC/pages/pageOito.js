import * as React from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import somenteLogo from '../assets/somenteLogo.png';

const PageOito = () => {
    const navigation = useNavigation(); // Hook para navegar entre as telas

    const handlePress = () => {
        navigation.navigate('Home'); // Substitua 'ProximaPagina' pelo nome da página de destino
    };

    return (
        <TouchableOpacity style={styles.fundo} onPress={handlePress} activeOpacity={1}>
            <View style={styles.fundo}>
                <Image style={styles.logo} resizeMode="cover" source={somenteLogo} />
                <Text style={styles.muitoObrigadoPela}>Muito obrigado pela participação!</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fundo: {
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    logo: {
        width: 70,
        height: 70,
        marginBottom: 20,
        top: -100,
    },
    muitoObrigadoPela: {
        fontSize: 30,
        textTransform: "uppercase",
        fontFamily: "ChelseaMarket-Regular",
        color: "#7834c4",
        textAlign: "center",
        paddingHorizontal: 20,
        top: -50,
    },
});

export default PageOito;

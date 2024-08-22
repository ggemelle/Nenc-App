import * as React from "react";
import { Image, StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import somenteLogo from '../assets/somenteLogo.png';
import Like from '../assets/like.png';
import Deslike from '../assets/deslike.png';

const ScreenOnze = () => {
    const navigation = useNavigation(); 
    const [message, setMessage] = React.useState(''); 
    const [hasInteracted, setHasInteracted] = React.useState(false);

    const handleNextPress = () => {
        navigation.navigate('ScreenDoze');
    };

    const handleInteraction = () => {
        setHasInteracted(true);
    };

    return (
        <View style={styles.planoDeFundo}>
            <Image style={styles.logo} resizeMode="contain" source={somenteLogo} />
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => { alert('Like button pressed'); handleInteraction(); }} style={styles.iconButton}>
                    <Image style={styles.like} resizeMode="contain" source={Like} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { alert('Deslike button pressed'); handleInteraction(); }} style={styles.iconButton}>
                    <Image style={styles.deslike} resizeMode="contain" source={Deslike} />
                </TouchableOpacity>
            </View>
            <View style={styles.textBoxContainer}>
                <TextInput
                    style={styles.caixaDeTexto}
                    value={message}
                    onChangeText={(text) => { setMessage(text); handleInteraction(); }}
                    placeholder="Digite sua mensagem aqui..."
                    placeholderTextColor="#454545"
                    multiline={true}
                    onFocus={handleInteraction} // Marca interação ao focar no TextInput
                />
            </View>
            <TouchableOpacity onPress={handleNextPress} style={styles.nextButton}>
                <Text style={styles.nextButtonText}>PRÓXIMO</Text>
            </TouchableOpacity>
        </View>
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
        top: -20
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginBottom: 20,
    },
    iconButton: {
        alignItems: "center",
        justifyContent: "center",
        width: 140,
        height: 140,
    },
    like: {
        width: "100%",
        height: "100%",
        top: -75,
        left: 40,
    },
    deslike: {
        width: "100%",
        height: "100%",
        top: -75,
        left: -40,
    },
    textBoxContainer: {
        width: "100%",
        position: "relative",
        alignItems: "center",
        marginTop: 20,
    },
    caixaDeTexto: {
        borderRadius: 15,
        backgroundColor: "rgba(217, 217, 217, 0.7)",
        width: "90%",
        height: 150,
        padding: 10,
        fontSize: 16,
        color: "#000",
        textAlignVertical: "top",
        top: -140
    },
    nextButton: {
        position: "absolute",
        bottom: 30,
        right: 54,
        backgroundColor: "#37adbd",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    nextButtonText: {
        fontSize: 14,
        color: "#fff",
        textAlign: "center",
        fontFamily: "Inter-SemiBold"
    },
});

export default ScreenOnze;

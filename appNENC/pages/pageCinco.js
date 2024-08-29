import * as React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useFonts, Almarai_700Bold, Almarai_800ExtraBold } from '@expo-google-fonts/almarai';
import somenteLogo from '../assets/somenteLogo.png';
import Elipse from '../assets/Ellipse3.png';
import { Audio } from 'expo-av';

const palavras = [
    "INCONVENIÊNCIA", "AMOR", "QUALIDADE", "SENSAÇÃO", "DESCONFIANÇA",
    "DURABILIDADE", "PROTEÇÃO", "CONSTRANGIMENTO", "PRAZER",
    "DESAGRADÁVEL", "DESCONFORTO", "INSEGURANÇA"
];

const PageCinco = ({ navigation }) => {
    const [currentText, setCurrentText] = useState(null);
    const [sound, setSound] = useState();
    const [count, setCount] = useState(0); // Contador para o número de redirecionamentos

    let [fontsLoaded] = useFonts({
        Almarai_700Bold,
        Almarai_800ExtraBold,
    });

    useEffect(() => {
        if (sound) {
            return () => {
                sound.unloadAsync();
            };
        }
    }, [sound]);

    useEffect(() => {
        if (fontsLoaded) {
            showRandomText(); // Mostra uma palavra aleatória quando as fontes são carregadas
            const timer = setTimeout(() => {
              if (count <= 6) { // Redireciona até 11 vezes
                playSound();
                Alert.alert(
                  "Tempo Esgotado",
                  "Você não pressionou um botão a tempo.",
                  [{ text: "OK", onPress: () => navigation.navigate('PageTres') }] // Redireciona para a mesma página
                );
                setCount(count + 1);
              } else {
                navigation.navigate('PageSeis'); // Navega para a nova tela após 11 vezes
              }
            }, 2500);
          
            return () => clearTimeout(timer); // Limpa o timer se o componente desmontar
        }
    }, [count, fontsLoaded]);

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require('../assets/beep.mp3'));
        setSound(sound);
        await sound.playAsync();
    }

    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Função para mostrar texto aleatório da lista de palavras
    const showRandomText = () => {
        const randomText = palavras[Math.floor(Math.random() * palavras.length)];
        setCurrentText(randomText);
    };

    // Lógica para tratar quando o botão é pressionado
    const handlePress = () => {
        navigation.navigate('PageTres'); // Redireciona para a mesma página
        showRandomText();
    };

    return (
        <View style={styles.planoDeFundo}>
            <Image style={styles.logo} resizeMode="contain" source={somenteLogo} />
            {currentText && (
                <Text style={styles.words}>
                    {currentText}
                </Text>
            )}
            <Image style={[styles.elipse, styles.elipseLeft]} resizeMode="contain" source={Elipse} />
            <Image style={[styles.elipse, styles.elipseRight]} resizeMode="contain" source={Elipse} />
            <TouchableOpacity style={[styles.labelText, styles.labelNao]} onPress={handlePress}>
                <Text style={styles.labelTextInner}>NÃO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.labelText, styles.labelSim]} onPress={handlePress}>
                <Text style={styles.labelTextInner}>SIM</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    planoDeFundo: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 70,
        height: 70,
        top: -125
    },
    words: {
        fontSize: 30,
        fontWeight: "700",
        fontFamily: "Almarai_700Bold",
        color: "#7834c4",
        textAlign: "center",
        textTransform: "uppercase",
        top: -100
    },
    elipse: {
        height: 120,
        width: 120,
        position: 'absolute',
    },
    elipseLeft: {
        top: '60%',
        left: '9%',
    },
    elipseRight: {
        top: '60%',
        left: '75%',
    },
    labelText: {
        position: 'absolute',
        height: 120,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelTextInner: {
        color: '#fff',
        fontSize: 35,
        textAlign: 'center',
        fontFamily: 'Almarai_800ExtraBold',
        textTransform: 'uppercase',
    },
    labelNao: {
        top: '60%',
        left: '9%',
    },
    labelSim: {
        top: '60%',
        left: '75%',
    },
});

export default PageCinco;
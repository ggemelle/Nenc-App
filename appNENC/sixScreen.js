import * as React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import somenteLogo from './assets/somenteLogo.png';
import Elipse from './assets/Ellipse3.png';
import { Audio } from 'expo-av'; // Certifique-se de instalar o pacote expo-av

const SixScreen = ({ navigation }) => {
    const [currentText, setCurrentText] = useState(null);
    const [counter, setCounter] = useState(0);
    const [sound, setSound] = useState();

    // Função para tocar o som de bipe
    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require('./assets/beep.mp3'));
        setSound(sound);
        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    useEffect(() => {
        showRandomText();
    }, []);

    const showRandomText = () => {
        const options = ['SIM', 'NÃO'];
        const randomText = options[Math.floor(Math.random() * options.length)];
        setCurrentText(randomText);
    };

    const handlePress = (pressedLabel) => {
        if (pressedLabel === currentText) {
            setCounter(counter + 1);
            if (counter + 1 === 10) {
                navigation.navigate('SevenScreen'); // Substitua 'TelaSete' pelo nome da sua próxima tela
            } else {
                showRandomText();
            }
        } else {
            playSound();
            Alert.alert("Erro", "Você apertou o botão errado!");
        }
    };

    return (
        <View style={styles.sixScreen}>
            <Image style={styles.logo} resizeMode="contain" source={somenteLogo} />
            {currentText && (
                <Text style={currentText === 'SIM' ? styles.simText : styles.naoText}>
                    {currentText}
                </Text>
            )}
            <Image style={[styles.elipse, styles.elipseLeft]} resizeMode="contain" source={Elipse} />
            <Image style={[styles.elipse, styles.elipseRight]} resizeMode="contain" source={Elipse} />
            <TouchableOpacity style={[styles.labelText, styles.labelNao]} onPress={() => handlePress('NÃO')}>
                <Text style={styles.labelTextInner}>NÃO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.labelText, styles.labelSim]} onPress={() => handlePress('SIM')}>
                <Text style={styles.labelTextInner}>SIM</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    sixScreen: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
        top: -80
    },
    simText: {
        color: '#7834c4',
        fontFamily: 'BakbakOne-Regular',
        textTransform: 'uppercase',
        fontSize: 50,
        marginBottom: 20,
        top: -70,
    },
    naoText: {
        color: '#7834c4',
        fontFamily: 'BakbakOne-Regular',
        textTransform: 'uppercase',
        fontSize: 50,
        marginBottom: 20,
        top: -70,
    },
    elipse: {
        height: 135,
        width: 135,
        position: 'absolute',
    },
    elipseLeft: {
        top: '53%',
        left: '13%',
    },
    elipseRight: {
        top: '53%',
        left: '68%',
    },
    labelText: {
        position: 'absolute',
        height: 135,
        width: 135,
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelTextInner: {
        color: '#000',
        fontSize: 40,
        textAlign: 'center',
        fontFamily: 'BakbakOne-Regular',
        textTransform: 'uppercase',
    },
    labelNao: {
        top: '53%',
        left: '12.8%',
    },
    labelSim: {
        top: '53%',
        left: '67.8%',
    },
});

export default SixScreen;

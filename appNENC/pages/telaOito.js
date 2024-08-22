import * as React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import somenteLogo from '../assets/somenteLogo.png';
import OllaLogo from '../assets/ollaLogo.png';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

const words = [
    "INCONVENIÊNCIA", "AMOR", "QUALIDADE", "SENSAÇÃO", "DESCONFIANÇA",
    "DURABILIDADE", "PROTEÇÃO", "CONSTRANGIMENTO", "PRAZER", 
    "DESAGRADÁVEL", "DESCONFORTO", "INSEGURANÇA"
];

const TelaOito = () => {
    const [currentWord, setCurrentWord] = React.useState('');
    const [currentText, setCurrentText] = React.useState('');
    const [count, setCount] = React.useState(0);
    const [showText, setShowText] = React.useState(true);
    const navigation = useNavigation();

    React.useEffect(() => {
        if (count < 10) {
            if (showText) {
                const word = words[Math.floor(Math.random() * words.length)];
                setCurrentWord(word);
                setTimeout(() => setShowText(false), 1000);
            } else {
                const text = Math.random() > 0.5 ? 'SIM' : 'NÃO';
                setCurrentText(text);
                setTimeout(() => setShowText(true), 1000);
            }
        } else {
            navigation.navigate('NonaTela');
        }
    }, [count, showText]);

    const handlePress = async (choice) => {
        if (!showText && choice === currentText) {
            setCount(count + 1);
        } else if (!showText && choice !== currentText) {
            const soundObject = new Audio.Sound();
            try {
                await soundObject.loadAsync(require('./assets/beep.mp3'));
                await soundObject.playAsync();
            } catch (error) {
                console.log(error);
            }
        }
        setCurrentWord('');
        setCurrentText('');
        setShowText(true);
    };

    return (
        <View style={styles.container}>
            <Image style={styles.somenteLogo} resizeMode="contain" source={somenteLogo} />
            {showText ? (
                <>
                    <Text style={styles.wordText}>{currentWord}</Text>
                    <Image style={styles.ollaLogo} resizeMode="contain" source={OllaLogo} />
                </>
            ) : (
                <Text style={[styles.answerText, currentText === 'NÃO' ? styles.naoText : styles.simText]}>
                    {currentText}
                </Text>
            )}
            <TouchableOpacity onPress={() => handlePress('NÃO')} style={[styles.elipseContainer, styles.elipseContainerLeft]}>
                <Text style={styles.labelText}>NÃO</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('SIM')} style={[styles.elipseContainer, styles.elipseContainerRight]}>
                <Text style={styles.labelText}>SIM</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    somenteLogo: {
        width: 100,
        height: 100,
        position: 'absolute',
        top: 0,
    },
    ollaLogo: {
        width: 120,
        height: 120,
        position: 'absolute',
        top: '30%',
    },
    wordText: {
        color: '#7834c4',
        fontFamily: 'BakbakOne-Regular',
        fontSize: 20,
        position: 'absolute',
        top: '57%',
        textAlign: 'center',
    },
    answerText: {
        color: '#7834c4',
        fontFamily: 'BakbakOne-Regular',
        fontSize: 50,
        marginBottom: 20,
        top: 80,
        textAlign: 'center',
    },
    simText: {
        color: '#7834c4',
        fontFamily: 'BakbakOne-Regular',
        fontSize: 50,
        marginBottom: 20,
        top: 30,
        textAlign: 'center',
    },
    naoText: {
        color: '#7834c4',
        fontFamily: 'BakbakOne-Regular',
        fontSize: 50,
        marginBottom: 20,
        top: 30,
        textAlign: 'center',
    },
    elipseContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: 135,
        height: 135,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#43c1cf',
        backgroundColor: '#43c1cf',
    },
    elipseContainerLeft: {
        top: '53%',
        left: '13%',
    },
    elipseContainerRight: {
        top: '53%',
        left: '68%',
    },
    labelText: {
        position: 'absolute',
        color: '#000',
        fontSize: 50,
        textAlign: 'center',
        fontFamily: 'BakbakOne-Regular',
    },
});

export default TelaOito;

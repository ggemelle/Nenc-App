import * as React from "react";
import { Image, StyleSheet, Text, View, PanResponder, Animated, Alert, Dimensions } from "react-native";
import somenteLogo from '../assets/somenteLogo.png';
import OllaLogo from '../assets/ollaLogo.png';
import Elipse from '../assets/Ellipse3.png';
import { useNavigation } from '@react-navigation/native';

const words = [
    "INCONVENIÊNCIA", "AMOR", "QUALIDADE", "SENSAÇÃO", "DESCONFIANÇA",
    "DURABILIDADE", "PROTEÇÃO", "CONSTRANGIMENTO", "PRAZER",
    "DESAGRADÁVEL", "DESCONFORTO", "INSEGURANÇA"
];

const TelaDez = () => {
    const navigation = useNavigation();
    const [currentWord, setCurrentWord] = React.useState('');
    const wordPosition = React.useRef(new Animated.ValueXY()).current;
    const opacity = React.useRef(new Animated.Value(1)).current;
    const [attemptCount, setAttemptCount] = React.useState(0);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    // Gerar uma nova palavra aleatória
    const generateNewWord = React.useCallback(() => {
        const word = words[Math.floor(Math.random() * words.length)];
        setCurrentWord(word);
    }, []);

    React.useEffect(() => {
        generateNewWord();
    }, [generateNewWord]);

    // Configuração do PanResponder
    const panResponder = React.useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10;
            },
            onPanResponderGrant: () => {
                wordPosition.setOffset({
                    x: wordPosition.x._value,
                    y: wordPosition.y._value,
                });
                wordPosition.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: wordPosition.x, dy: wordPosition.y }
                ],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: (e, gesture) => {
                const isDroppedInArea = (xMin, xMax, yMin, yMax) => 
                  gesture.moveX > xMin && gesture.moveX < xMax && gesture.moveY > yMin && yMax > gesture.moveY;
              
                const leftArea = isDroppedInArea(screenWidth * 0.1, screenWidth * 0.5, screenHeight * 0.5, screenHeight * 0.7);
                const rightArea = isDroppedInArea(screenWidth * 0.5, screenWidth * 0.9, screenHeight * 0.5, screenHeight * 0.7);
              
                if (leftArea || rightArea) {
                  Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                  }).start(() => {
                    generateNewWord();
                    opacity.setValue(1); 
                    setAttemptCount(prev => prev + 1); 
                    wordPosition.setValue({ x: 0, y: 0 }); 
                  });
                } else {
                  Alert.alert("Atenção!", "Você precisa arrastar a palavra até uma das elipses para continuar.");
                  generateNewWord();
                  wordPosition.setValue({ x: 0, y: 0 });
                }
            }
        })
    ).current;

    React.useEffect(() => {
        if (attemptCount >= 6) {
            Alert.alert("Fim do Jogo", "Você completou todas as tentativas!", [
                {
                    text: "OK",
                    onPress: () => navigation.navigate('ScreenOnze'), // Navega para a próxima tela
                },
            ]);
        }
    }, [attemptCount, navigation]);

    return (
        <View style={styles.telaDez}>
            <Image style={styles.somenteLogo} resizeMode="contain" source={somenteLogo} />
            <Image style={styles.ollaLogo} resizeMode="contain" source={OllaLogo} />
            <Animated.View
                style={[
                    styles.wordTextContainer,
                    {
                        transform: [
                            { translateX: wordPosition.x },
                            { translateY: wordPosition.y },
                        ],
                        opacity: opacity,
                    }
                ]}
                {...panResponder.panHandlers}
            >
                <Text style={styles.wordText}>{currentWord}</Text>
            </Animated.View>
            <View style={[styles.elipseContainer, styles.elipseContainerLeft]}>
                <Image style={styles.elipse} resizeMode="contain" source={Elipse} />
                <Text style={styles.labelText}>NÃO</Text>
            </View>
            <View style={[styles.elipseContainer, styles.elipseContainerRight]}>
                <Image style={styles.elipse} resizeMode="contain" source={Elipse} />
                <Text style={styles.labelText}>SIM</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    telaDez: {
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
    wordTextContainer: {
        position: 'absolute',
        top: '57%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wordText: {
        color: '#7834c4',
        fontFamily: 'BakbakOne-Regular',
        textTransform: 'uppercase',
        fontSize: 23,
    },
    elipseContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: 135,
        height: 135,
    },
    elipseContainerLeft: {
        top: '53%',
        left: '10%',
    },
    elipseContainerRight: {
        top: '53%',
        right: '10%',
    },
    elipse: {
        width: '100%',
        height: '100%',
    },
    labelText: {
        position: 'absolute',
        color: '#000',
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'BakbakOne-Regular',
        textTransform: 'uppercase',
    },
});

export default TelaDez;
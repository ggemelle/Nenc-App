import * as React from "react";
import { Image, StyleSheet, Text, View, PanResponder, Animated, Alert, Dimensions } from "react-native";
import somenteLogo from './assets/somenteLogo.png';
import OllaLogo from './assets/ollaLogo.png';
import Elipse from './assets/Ellipse3.png';

const words = [
    "INCONVENIÊNCIA", "AMOR", "QUALIDADE", "SENSAÇÃO", "DESCONFIANÇA",
    "DURABILIDADE", "PROTEÇÃO", "CONSTRANGIMENTO", "PRAZER",
    "DESAGRADÁVEL", "DESCONFORTO", "INSEGURANÇA"
];

const TelaDez = () => {
    const [currentWord, setCurrentWord] = React.useState('');
    const [wordPosition] = React.useState(new Animated.ValueXY());
    const [opacity] = React.useState(new Animated.Value(1));
    const [droppedInLeft, setDroppedInLeft] = React.useState(false);
    const [droppedInRight, setDroppedInRight] = React.useState(false);
    const [attemptCount, setAttemptCount] = React.useState(0);
    const [isDraggingEnabled, setIsDraggingEnabled] = React.useState(true);

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    // Gerar uma nova palavra aleatória
    const generateNewWord = () => {
        const word = words[Math.floor(Math.random() * words.length)];
        setCurrentWord(word);
    };

    React.useEffect(() => {
        generateNewWord();
    }, []);

    // Configuração do PanResponder
    const panResponder = React.useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return isDraggingEnabled && (Math.abs(gestureState.dx) > 20 || Math.abs(gestureState.dy) > 20);
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
                const leftArea = gesture.moveX < (screenWidth * 0.5) && gesture.moveX > (screenWidth * 0.1) && gesture.moveY > (screenHeight * 0.5) && gesture.moveY < (screenHeight * 0.7);
                const rightArea = gesture.moveX > (screenWidth * 0.5) && gesture.moveX < (screenWidth * 0.9) && gesture.moveY > (screenHeight * 0.5) && gesture.moveY < (screenHeight * 0.7);

                // Animação de desaparecimento se a palavra for arrastada para a área correta
                if (leftArea || rightArea) {
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }).start(() => {
                        generateNewWord();
                        opacity.setValue(1); // Reseta a opacidade
                        setIsDraggingEnabled(false); // Bloqueia arrasto

                        // Habilita o arrasto novamente após 1000ms
                        setTimeout(() => {
                            setIsDraggingEnabled(true);
                        }, 1000);
                    });

                    if (leftArea) {
                        setDroppedInLeft(true);
                    } else if (rightArea) {
                        setDroppedInRight(true);
                    }
                } else {
                    // Reseta a posição da palavra se não for arrastada para as áreas corretas
                    wordPosition.flattenOffset();
                    Animated.spring(wordPosition, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: true,
                    }).start(() => {
                        // Bloqueia arrasto após uma tentativa falha
                        setIsDraggingEnabled(false);
                        setTimeout(() => {
                            setIsDraggingEnabled(true);
                        }, 1000);
                    });
                }
            }
        })
    ).current;

    // Redefinir estado após arrastar e soltar
    React.useEffect(() => {
        if (droppedInLeft || droppedInRight) {
            setDroppedInLeft(false);
            setDroppedInRight(false);
            wordPosition.setValue({ x: 0, y: 0 });
            setAttemptCount(prevCount => prevCount + 1);

            // Verificar se o limite de tentativas foi atingido
            if (attemptCount + 1 >= 10) {
                Alert.alert("Fim do Jogo", "Você completou todas as tentativas!");
                // Aqui você pode redirecionar para outra tela ou reiniciar o jogo
            }
        }
    }, [droppedInLeft, droppedInRight]);

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

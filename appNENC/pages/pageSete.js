import * as React from "react";
import { Image, StyleSheet, Text, View, PanResponder, Animated, Easing, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import somenteLogo from '../assets/somenteLogo.png';
import Elipse from '../assets/Ellipse3.png';

const palavras = [
    "INCONVENIÊNCIA", "AMOR", "QUALIDADE", "SENSAÇÃO", "DESCONFIANÇA",
    "DURABILIDADE", "PROTEÇÃO", "CONSTRANGIMENTO", "PRAZER",
    "DESAGRADÁVEL", "DESCONFORTO", "INSEGURANÇA"
];

const PageSete = () => {
    const navigation = useNavigation();
    const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
    const [draggedCount, setDraggedCount] = React.useState(0);
    const pan = React.useRef(new Animated.ValueXY()).current;
    const offset = React.useRef({ x: 0, y: 0 }).current;
    const sound = React.useRef(new Audio.Sound());

    // Função para carregar o som
    const loadSound = async () => {
        try {
            await sound.current.loadAsync(require('../assets/beep.mp3'));
        } catch (error) {
            console.log("Erro ao carregar o som:", error);
        }
    };

    // Função para tocar o som
    const playSound = async () => {
        try {
            await sound.current.replayAsync();
        } catch (error) {
            console.log("Erro ao tocar o som:", error);
        }
    };

    // Função para resetar a posição da palavra
    const resetPosition = () => {
        pan.setValue({ x: 0, y: 0 });
        offset.x = 0;
        offset.y = 0;
        startWordAnimation();
    };

    // Função para avançar para a próxima palavra
    const nextWord = () => {
        if (draggedCount < 8) {
            setCurrentWordIndex(prev => (prev + 1) % palavras.length);
            setDraggedCount(prev => prev + 1);
            resetPosition();
        } else {
            Alert.alert("Fim", "Você completou todas as tentativas.");
            navigation.navigate('PageSeis');
        }
    };

    // Animação de descida da palavra
    const startWordAnimation = () => {
        Animated.timing(pan, {
            toValue: { x: 0, y: 400 },
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(async ({ finished }) => {  // Tornando o callback async
            if (finished) {
                await playSound();  // Espera o som terminar antes de continuar
                setTimeout(() => {
                    Alert.alert("Tempo esgotado", "Você não arrastou a palavra a tempo.");
                    nextWord();
                }, 300);
            }
        });
    };

    // PanResponder para o movimento de arrastar
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            pan.setOffset({
                x: pan.x._value,
                y: pan.y._value,
            });
            pan.setValue({ x: 0, y: 0 });
        },
        onPanResponderMove: Animated.event(
            [
                null,
                { dx: pan.x, dy: pan.y }
            ],
            { useNativeDriver: false }
        ),
        onPanResponderRelease: (e, gesture) => {
            pan.flattenOffset();

            const { moveX, moveY } = gesture;

            // Verifica se a palavra foi arrastada para as áreas das elipses
            if ((moveX > 50 && moveX < 200 && moveY > 200 && moveY < 400) ||
                (moveX > 600 && moveX < 750 && moveY > 200 && moveY < 400)) {
                nextWord();
            } else {
                playSound();
                Alert.alert("Alerta", "Você deve arrastar a palavra para uma das áreas 'SIM' ou 'NÃO'.");
                resetPosition();
            }
        }
    });

    React.useEffect(() => {
        loadSound();
        startWordAnimation();

        return () => {
            sound.current.unloadAsync(); // Descarregar o som quando o componente for desmontado
        };
    }, [currentWordIndex]);

    return (
        <View style={styles.planoDeFundo}>
            <Image style={styles.logo} resizeMode="cover" source={somenteLogo} />
            <Image style={styles.noElipse} resizeMode="cover" source={Elipse} />
            <Text style={styles.noTypo}>NÃO</Text>
            <Image style={styles.simElipse} resizeMode="cover" source={Elipse} />
            <Text style={styles.simTypo}>SIM</Text>
            <Animated.View
                {...panResponder.panHandlers}
                style={[pan.getLayout(), styles.draggableContainer]}
            >
                <Text style={styles.words}>{palavras[currentWordIndex]}</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    planoDeFundo: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        overflow: "hidden"
    },
    logo: {
        width: 70,
        height: 70,
        alignSelf: "center",
        top: 40
    },
    words: {
        fontSize: 30,
        fontWeight: "700",
        fontFamily: "Almarai-Bold",
        color: "#7834c4",
        textAlign: "center",
        textTransform: "uppercase",
        top: -290
    },
    noElipse: {
        width: 120,
        height: 120,
        left: -260,
        top: 180
    },
    noTypo: {
        color: "#000",
        fontFamily: "Almarai-ExtraBold",
        fontWeight: "800",
        fontSize: 30,
        textAlign: "center",
        textTransform: "uppercase",
        top: 100,
        left: -260
    },
    simElipse: {
        width: 120,
        height: 120,
        top: 22,
        left: 260
    },
    simTypo: {
        color: "#000",
        fontFamily: "Almarai-ExtraBold",
        fontWeight: "800",
        fontSize: 30,
        textAlign: "center",
        textTransform: "uppercase",
        top: -60,
        left: 260
    }
});

export default PageSete;

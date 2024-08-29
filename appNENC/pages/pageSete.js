import * as React from "react";
import { Image, StyleSheet, Text, View, PanResponder, Animated, Easing, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system'; // Importando expo-file-system
import somenteLogo from '../assets/somenteLogo.png';
import Elipse from '../assets/Ellipse3.png';

const palavras = [
    "INCONVENIÊNCIA", "AMOR", "QUALIDADE", "SENSAÇÃO", "DESCONFIANÇA",
    "DURABILIDADE", "PROTEÇÃO", "CONSTRANGIMENTO", "PRAZER",
    "DESAGRADÁVEL", "DESCONFORTO", "INSEGURANÇA"
];

// Função para embaralhar a lista de palavras
const shuffleArray = (array) => {
    let shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const PageSete = () => {
    const navigation = useNavigation();
    const [shuffledWords, setShuffledWords] = React.useState(shuffleArray(palavras));
    const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
    const [draggedCount, setDraggedCount] = React.useState(0);
    const [attempts, setAttempts] = React.useState([]); // Estado para armazenar as tentativas
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
        if (draggedCount <= 10) {
            const nextIndex = (currentWordIndex + 1) % shuffledWords.length;
            setCurrentWordIndex(nextIndex);
            setDraggedCount(prev => prev + 1);
            resetPosition();
        } else {
            Alert.alert("Fim", "Você completou todas as tentativas.");
            exportCSV(); // Exporta o CSV ao final
            navigation.navigate('PageOito');
        }
    };

    // Animação de descida da palavra
    const startWordAnimation = () => {
        Animated.timing(pan, {
            toValue: { x: 0, y: 400 },
            duration: 6000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(async ({ finished }) => {
            if (finished) {
                await playSound();
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
                // Adiciona a tentativa ao estado
                setAttempts(prevAttempts => [
                    ...prevAttempts,
                    { word: shuffledWords[currentWordIndex], area: moveX > 600 ? 'SIM' : 'NÃO' }
                ]);
                nextWord();
            } else {
                playSound();
                Alert.alert("Alerta", "Você deve arrastar a palavra para uma das áreas 'SIM' ou 'NÃO'.");
                resetPosition();
            }
        }
    });

    // Função para converter os dados das tentativas em CSV
    const convertToCSV = (data) => {
        const header = 'Palavra,Área\n';
        const rows = data.map(item => `${item.word},${item.area}`).join('\n');
        return header + rows;
    };

    // Função para gerar um nome de arquivo único com base na data e hora
    const generateFileName = () => {
        const date = new Date();
        const timestamp = date.toISOString().replace(/[-:.T]/g, '_'); // Remove caracteres inválidos para nomes de arquivos
        return `resposta_${timestamp}.csv`;
    };

    // Função para exportar o CSV
    const exportCSV = async () => {
        try {
            const csvContent = convertToCSV(attempts);
            const fileName = generateFileName();
            const path = `${FileSystem.documentDirectory}${fileName}`;
            await FileSystem.writeAsStringAsync(path, csvContent, {
                encoding: FileSystem.EncodingType.UTF8,
            });
            Alert.alert("Sucesso", `CSV exportado com sucesso! Arquivo: ${fileName}`);
        } catch (error) {
            console.log("Erro ao exportar CSV:", error);
            Alert.alert("Erro", "Houve um problema ao exportar o CSV.");
        }
    };

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
                <Text style={styles.words}>{shuffledWords[currentWordIndex]}</Text>
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

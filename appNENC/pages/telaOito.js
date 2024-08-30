import * as React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useFonts, Almarai_700Bold, Almarai_800ExtraBold } from '@expo-google-fonts/almarai';
import somenteLogo from '../assets/somenteLogo.png';
import Elipse from '../assets/Ellipse3.png';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const palavras = [
    "INCONVENIÊNCIA", "AMOR", "QUALIDADE", "SENSAÇÃO", "DESCONFIANÇA",
    "DURABILIDADE", "PROTEÇÃO", "CONSTRANGIMENTO", "PRAZER",
    "DESAGRADÁVEL", "DESCONFORTO", "INSEGURANÇA"
];

const TelaOito = ({ navigation, route }) => {
    const [currentText, setCurrentText] = useState(null);
    const [sound, setSound] = useState();
    const [count, setCount] = useState(route.params?.count || 0);
    const [timerActive, setTimerActive] = useState(false); 
    const [timerId, setTimerId] = useState(null); 
    const [data, setData] = useState(route.params?.data || []); // Recebe os dados da página anterior

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
            showRandomText();
        }
    }, [fontsLoaded]);

    useEffect(() => {
        let timer;
        if (currentText && count < 12) {
            setTimerActive(true); 
            timer = setTimeout(() => {
                playSound();
                Alert.alert(
                    "Tempo Esgotado",
                    "Você não pressionou um botão a tempo.",
                    [{ text: "OK", onPress: handlePress }]
                );
            }, 2500);
            setTimerId(timer); 
        } else if (count >= 12) {
            saveAndShareCSV(); 
        }

        return () => {
            clearTimeout(timer);
            setTimerActive(false);
        };
    }, [currentText, count]);

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require('../assets/beep.mp3'));
        setSound(sound);
        await sound.playAsync();
    }

    const showRandomText = () => {
        if (count < 12) {
            const randomText = palavras[Math.floor(Math.random() * palavras.length)];
            setCurrentText(randomText);
        }
    };

    const handlePress = (area) => {
        if (timerActive) {
            clearTimeout(timerId); 
        }
    
        // Atualiza o estado `data` e depois executa o código restante
        setData(prevData => {
            const updatedData = [...prevData, { word: currentText, area }];
            
            if (count < 11) {
                navigation.navigate('TelaSete', { count: count + 1, data: updatedData }); // Passar `count` e `data` atualizados para a próxima página
            } else {
                saveAndShareCSV(updatedData); // Passar `data` atualizado para a função de salvar e compartilhar CSV
                navigation.navigate('TelaNove');
            }
    
            setCount(prevCount => prevCount + 1);
            return updatedData;
        });
    };
    
    const saveAndShareCSV = async (updatedData) => {
        const csv = convertToCSV(updatedData);
    
        // Adiciona um timestamp ao nome do arquivo para torná-lo único
        const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
        const fileUri = FileSystem.documentDirectory + `data_${timestamp}.csv`;
    
        await FileSystem.writeAsStringAsync(fileUri, csv);
    
        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(fileUri);
        } else {
            Alert.alert('Erro', 'O compartilhamento de arquivos não está disponível no seu dispositivo.');
        }
    };
    
    const convertToCSV = (data) => {
        const header = 'Palavra,Área\n';
        const rows = data.map(item => `${item.word},${item.area}`).join('\n');
        return header + rows;
    };

    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

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
    }
});

export default TelaOito;

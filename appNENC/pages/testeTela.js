import * as React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Video } from 'expo-av'; // Certifique-se de ter o pacote expo-av instalado
import Logo from "../assets/ollaLogo.png";
import VideoSource from "../assets/comercial.mp4";

const PageTres = () => {
    const [mediaType, setMediaType] = React.useState('image');
    const videoRef = React.useRef(null);

    React.useEffect(() => {
        if (mediaType === 'video' && videoRef.current) {
            videoRef.current.playAsync(); // Garante que o vídeo será reproduzido quando alternar para vídeo
        }
    }, [mediaType]);

    const toggleMediaType = () => {
        setMediaType(prevMediaType => prevMediaType === 'image' ? 'video' : 'image');
    };

    return (
        <View style={styles.page3}>
            <TouchableOpacity
                style={styles.button}
                onPress={toggleMediaType}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} // Aumenta a área de toque do botão
            >
                <Text style={styles.comercial}>COMERCIAL</Text>
            </TouchableOpacity>
            {mediaType === 'image' ? (
                <Image style={styles.logo} resizeMode="contain" source={Logo} />
            ) : (
                <Video
                    ref={videoRef}
                    source={VideoSource}
                    style={styles.video}
                    resizeMode="contain"
                    shouldPlay
                    isLooping
                    useNativeControls // Adiciona controles de mídia nativos
                    volume={1.0} // Garante que o volume esteja no máximo
                    isMuted={false} // Garante que o som não esteja mutado
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        top: 285,
        left: 610,
        borderRadius: 20,
        backgroundColor: "#7834c4",
        height: 40,
        width: 100,
    },
    comercial: {
        left: 0,
        top: 8,
        fontSize: 15,
        fontWeight: "700",
        fontFamily: "Inter-Bold",
        color: "#fff",
        textAlign: "center",
        height: 30
    },
    page3: {
        backgroundColor: "#000",
        flex: 1,
        width: "100%",
        height: 640,
        overflow: "hidden"
    },
    logo: {
        width: 300,
        height: 300,
        top: -30,
        left: 220,
    },
    video: {
        width: 480,
        height: 480,
        top: -160,
        left: 125
    }
});

export default PageTres;

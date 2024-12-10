import { ActivityIndicator,Image,StyleSheet,Text,View } from "react-native";
import React,{ useEffect,useState } from "react";
import axios from "axios";


type Props = {
    ticketId: string;
}
const QRCode:React.FC<Props> = (props) => {
    const [qrImage, setQrImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Pobierz kod QR z serwera
        const fetchQRCode = async () => {
            try {
                const response = await axios.get(`http://your-server.com/show/${props.ticketId}`);
                setQrImage(response.data.qr_image); // Ustaw Base64 obrazu
            } catch (error) {
                console.error('Błąd podczas pobierania kodu QR:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQRCode();
    }, [props.ticketId]);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!qrImage) {
        return (
            <View style={styles.errorContainer}>
                <Text>Nie udało się załadować kodu QR.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: qrImage }}
                style={styles.qrImage}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrImage: {
        width: 200,
        height: 200,
    },
});

export default QRCode;

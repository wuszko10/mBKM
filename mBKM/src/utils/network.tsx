import { ToastAndroid } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const checkInternetConnection = async () => {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
        ToastAndroid.show('Brak połączenia z internetem', ToastAndroid.SHORT);
        return false;
    }
    return true;
};

export default checkInternetConnection;

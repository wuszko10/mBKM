import React,{ useState } from "react";
import { View,TextInput,Text,TouchableOpacity } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import { colors,dimensions } from "../../style/styleValues.js";
import ProcessingPopup from "../Global/ProcessingPopup.tsx";
import { payBlik,payCard,topUpBlik } from "../../services/payment.service.tsx";
import { useAuth } from "../Global/AuthContext.tsx";
import { storage } from "../../../App.tsx";

type OnlinePaymentProps = {
    transactionId: string,
    transactionAmount: number;
    userTicketId?: string;
    cancelAction: () => void;
}

const OnlinePayment: React.FC<OnlinePaymentProps> = (props) => {

    const [code, setCode] = useState<string>()
    const [showPopup, setShowPopup] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [popupText, setPopupText] = useState("");
    const {wallet, setWallet, token} = useAuth();
    const processTransactionPayment = async (code: string) => {
        setIsProcessing(true);

        let data;

        try {
            if (props.userTicketId) {
                data = await payBlik(props.transactionAmount, props.transactionId, code, props.userTicketId, token ? token : '');
                if (data) {
                    setPopupText("Transakcja zakończona pomyślnie!");
                }
            } else {
                data = await topUpBlik(props.transactionAmount, props.transactionId, code, wallet ? wallet?.id : '', token ? token : '');
                if (data) {
                    setWallet(data);
                    storage.set('wallet', JSON.stringify(data));
                    setPopupText("Transakcja zakończona pomyślnie!");
                }
            }
        } catch (error) {
            if (error.response.status === 406) {
                setPopupText("Błędny kod.\nBilet nie został zakupiony");
            } else {
                setPopupText("Wystąpił błąd podczas przetwarzania płatności.");
            }
        } finally {
            setIsProcessing(false);
            setShowPopup(true);
        }
    };


    const handleOnlinePayment = () => {
        if (props.transactionAmount && code && code.length === 6) {
            processTransactionPayment(code).then();
        } else {
            console.log('Proszę wprowadzić poprawne dane transakcji.');
        }
    };


    return (
        <View style={stylesApp.paymentBox}>

            <View style={[stylesApp.rowContainer, {alignSelf: "center"}]}>
                <Text style={stylesApp.whiteNormalCenterText}>Podaj kod</Text>
                <TextInput style={[stylesApp.input, {width: 120, textAlign: "center", borderRadius: dimensions.radius}]}
                           placeholder="6-cyfrowy kod"
                           value={code}
                           onChangeText={setCode}
                           keyboardType="numeric"
                           autoCapitalize="none"
                           placeholderTextColor={colors.darkGray}
                />
            </View>


            <View style={stylesApp.separator} />

            <TouchableOpacity onPress={handleOnlinePayment} style={stylesApp.whiteButton}>
                <Text style={[stylesApp.popupText,{ color: colors.appFirstColor}]}>Zapłać</Text>
            </TouchableOpacity>

            { showPopup && (
                <ProcessingPopup
                    showPopup={showPopup}
                    isProcessing={isProcessing}
                    cancelText={popupText}
                    cancelAction={props.cancelAction}
                />
            )}
        </View>
    );
};

export default OnlinePayment;

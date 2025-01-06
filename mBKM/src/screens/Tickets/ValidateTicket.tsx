import React from "react";
import { ActivityIndicator,SafeAreaView,Text,View } from "react-native";
import { useRoute } from "@react-navigation/native";
import stylesApp from "../../style/stylesApp.js";
import Popup from "../../components/Popups/Popup.tsx";
import ProcessingPopup from "../../components/Popups/ProcessingPopup.tsx";
import { colors } from "../../style/styleValues.js";
import { useValidateTicketLogic } from "../../hooks/Ticket/useValidateTicketLogic.tsx";

type RouteParams = {
    userTicketId: string;
    walletTransaction?: boolean;
}

const ValidateTicket = () => {

    const route = useRoute();
    const { userTicketId, walletTransaction} = route.params as RouteParams;

    const {
        loading,
        showPaymentPopup,
        isProcessing,
        cancelPopupText,
        cancelPopupAction,
        showPopup,
        confirmationPopupAction,
        showBadPopupRequest,
        badPopupText,
        refreshLocation,
    } = useValidateTicketLogic(userTicketId, walletTransaction);


    if (loading) {
        return (
            <View style={stylesApp.fullBlueContainer}>
                <ActivityIndicator size="large" color={colors.appWhite} />
                <Text style={{color: colors.gray}}>Lokalizowanie...</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={stylesApp.fullBlueContainer}>
            <ProcessingPopup
                showPopup={showPaymentPopup}
                isProcessing={isProcessing}
                cancelText={cancelPopupText}
                cancelAction={cancelPopupAction}
            />

            <Popup
                showPopup={showPopup}
                message={"Czy chcesz skasować bilet?"}
                confirmationText={"Tak"}
                cancelText={"Nie"}
                confirmationAction={confirmationPopupAction}
                cancelAction={cancelPopupAction} />

            <Popup
                showPopup={showBadPopupRequest}
                message={badPopupText}
                confirmationText={"Ponów"}
                cancelText={"Zakończ"}
                confirmationAction={refreshLocation}
                cancelAction={cancelPopupAction} />
        </SafeAreaView>
    );
};

export default ValidateTicket;

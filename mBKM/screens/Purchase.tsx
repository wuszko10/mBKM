import React from "react";
import { SafeAreaView,StyleSheet,Text,TouchableOpacity,View } from "react-native";
import { colors,dimensions } from "../style/styleValues.js";
import Header from "../components/Header.tsx";
import stylesApp from "../style/stylesApp.js";
import TicketSelector from "../components/TicketSelector.tsx";
import DateSelector from "../components/DateSelector.tsx";
import TicketAndReliefTypeSelector from "../components/TicketAndReliefTypeSelector.tsx";
import { usePurchaseLogic } from "../components/hooks/usePurchaseLogic.tsx";

const Purchase = () => {

    const {
        setSelectedTicket,
        selectedTicketId,
        setSelectedTicketId,
        selectedDiscount,
        setSelectedDiscount,
        finalPrice,
        setFinalPrice,
        singleTicket,
        seasonTicket,
        selectedDate,
        setSelectedDate,
        showDate,
        setShowDate,
        handleSingleTicket,
        handleSeasonTicket,
        handleSummaryPurchase,
        calculateFinalPrice,
    } = usePurchaseLogic();

    return (
        <SafeAreaView style={stylesApp.container}>

            <Header title="Kup bilet"/>

            <View style={stylesApp.contentBox}>

                <TicketSelector
                    singleTicket={singleTicket}
                    seasonTicket={seasonTicket}
                    handleSingleTicket={handleSingleTicket}
                    handleSeasonTicket={handleSeasonTicket}
                />

                {singleTicket || seasonTicket ?(
                    <TicketAndReliefTypeSelector
                        setSelectedTicket={setSelectedTicket}
                        selectedTicketId={selectedTicketId}
                        setSelectedTicketId={setSelectedTicketId}
                        selectedDiscount={selectedDiscount}
                        setSelectedDiscount={setSelectedDiscount}
                        singleTicket={singleTicket}
                        seasonTicket={seasonTicket}
                        setFinalPrice={setFinalPrice}
                        calculateFinalPrice={calculateFinalPrice}
                    />
                ): null}

                {seasonTicket ? (
                    <DateSelector showDate={showDate} setShowDate={setShowDate} selectedDate={selectedDate} setSelectedDate={setSelectedDate} calculateFinalPrice={calculateFinalPrice}/>

                ) : null}

            </View>

            {finalPrice !== null && (
                <View style={localStyle.summaryBox}>
                    <Text style={localStyle.finalPrice}>Cena końcowa: <Text style={stylesApp.boldText}>{finalPrice.toFixed(2)} zł</Text></Text>

                    <TouchableOpacity onPress={handleSummaryPurchase}  style={stylesApp.mainButton}>
                        <Text style={stylesApp.whiteBoldCenterText}>Podsumowanie transakcji</Text>
                    </TouchableOpacity>
                </View>
            )}

        </SafeAreaView>
    );
};

const localStyle = StyleSheet.create({
    ticketItem: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 15,
        borderRadius: dimensions.radius,
    },

    summaryBox:{
        marginTop: 45,
        bottom: 10,
        alignItems: "center",
        gap: 12,
    },
    finalPrice: {
        color: colors.textColorBlack,
        fontSize: dimensions.largeTextSize,
    }

});

export default Purchase;

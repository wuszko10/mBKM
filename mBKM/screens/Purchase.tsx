import React,{ useState } from "react";
import { SafeAreaView,ScrollView,Text,TouchableOpacity,View } from "react-native";
import Header from "../components/Header.tsx";
import stylesApp from "../style/stylesApp.js";
import TicketSelector from "../components/TicketSelector.tsx";
import TicketTypeSelector from "../components/TicketTypeSelector.tsx";
import { Ticket,TicketsPurchased } from "../repositories/interfaces.tsx";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import SelectingPurchaseConfiguration from "./SelectingPurchaseConfiguration.tsx";

type RootStackParamList = {
    Purchase: undefined;
    SelectingPurchaseConfiguration: {
        selectedTicket: Ticket,
        singleTicket: boolean,
        seasonTicket: boolean,
        numberSelectedLines: string,
    };
    Home: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Purchase'>;

const Purchase = () => {

    const navigation = useNavigation<NavigationProp>();

    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
    const [singleTicket, setSingleTicket] = useState(false);
    const [seasonTicket, setSeasonTicket] = useState(false);
    const [numberSelectedLines, setNumberSelectedLines] = useState("");

    function resetData() {
        setSelectedTicketId(null);
        setNumberSelectedLines("");
    }

    function resetTicket() {
        setSingleTicket(false);
        setSeasonTicket(false);
    }

    function handleSingleTicket() {
        setSingleTicket(!singleTicket);
        if (seasonTicket) {
            setSeasonTicket(!seasonTicket);
            setSelectedTicketId(null);
        }
        resetData();
    }

    function handleSeasonTicket() {
        setSeasonTicket(!seasonTicket);
        if (singleTicket) {
            setSingleTicket(!singleTicket);
            setSelectedTicketId(null);
        }
        resetData();
    }

    const handlePurchase= () => {
        if (selectedTicket !== null && selectedTicketId) {
            navigation.navigate('SelectingPurchaseConfiguration',{
                selectedTicket,
                singleTicket,
                seasonTicket,
                numberSelectedLines,
            })
            resetTicket();
            resetData();
        } else {
            console.log('Brak wystarczających danych do podsumowania transakcji.');
        }
    }

    return (
        <ScrollView style={stylesApp.scrollContainer}>
            <SafeAreaView style={stylesApp.container}>

                <Header title="Kup bilet" />

                <View style={stylesApp.contentBox}>

                    <TicketSelector
                        singleTicket={singleTicket}
                        seasonTicket={seasonTicket}
                        handleSingleTicket={handleSingleTicket}
                        handleSeasonTicket={handleSeasonTicket}
                    />

                    {(singleTicket || seasonTicket) && (
                        <View>
                            <TicketTypeSelector
                                setSelectedTicket={setSelectedTicket}
                                selectedTicketId={selectedTicketId}
                                setSelectedTicketId={setSelectedTicketId}
                                singleTicket={singleTicket}
                                seasonTicket={seasonTicket}
                                numberSelectedLines={numberSelectedLines}
                                setNumberSelectedLines={setNumberSelectedLines}
                            />

                            <View style={stylesApp.summaryBox}>
                                <TouchableOpacity onPress={handlePurchase} style={stylesApp.mainButton}>
                                    <Text style={stylesApp.whiteBoldCenterText}>Kup bilet</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )}

                </View>


            </SafeAreaView>
        </ScrollView>
    );

};

export default Purchase;

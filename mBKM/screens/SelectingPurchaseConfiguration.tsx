import React,{ useEffect,useState } from "react";
import { SafeAreaView,Text,TouchableOpacity,View } from "react-native";
import Header from "../components/Header.tsx";
import stylesApp from "../style/stylesApp.js";
import DateSelector from "../components/DateSelector.tsx";
import { reliefs,lines } from "../repositories/Data.tsx";
import DropdownSelector from "../components/DropdownSelector.tsx";
import { Ticket } from "../repositories/interfaces.tsx";
import { useNavigation,useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Mci from "react-native-vector-icons/MaterialCommunityIcons";

type RouteParams = {
    selectedTicket: Ticket;
    singleTicket: boolean;
    seasonTicket: boolean;
    numberSelectedLines: string;
}

type RootStackParamList = {
    Purchase: undefined;
    SelectingPurchaseConfiguration: undefined;
    Home: undefined;
    SummaryPurchaseScreen: {
        selectedTicket: Ticket,
        selectedLines?: number,
        selectedRelief: string,
        selectedDate?: string,
        finalPrice: number
    };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'SelectingPurchaseConfiguration'>;
const SelectingPurchaseConfiguration = () => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute();
    const {selectedTicket,singleTicket,seasonTicket, numberSelectedLines} = route.params as RouteParams;
    const [showDate, setShowDate] = useState(false);
    const [selectedRelief, setSelectedRelief] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState(new(Date));
    const [finalPrice, setFinalPrice] = useState(0);
    const [selectedLines, setSelectedLines] = useState<number | null>(null);
    const [lineText, setLineText] = useState("");
    const lineObj = lines.find(line => line.line === "wszystkie")

    function resetData() {
        setSelectedRelief(null);
        setSelectedLines(null);
        setFinalPrice(0);
        setShowDate(false);
    }

    const filteredDiscounts = reliefs
        .filter(discount => (singleTicket && discount.type === "jednorazowy") || (seasonTicket && discount.type === "okresowy"))
        .map(discount => ({
            label: discount.name+" ("+discount.discountPercentage+"%)",
            value: discount._id
        }));

    const filteredLines = lines
        .filter(line => !(line.line === "wszystkie"))
        .map(line => ({
            label: line.line,
            value: String(line._id)
        }));

    const finalSummary = () => {
        if (selectedTicket && selectedRelief) {
            const selectedDiscountData = reliefs.find(discount => discount._id === selectedRelief);
            if (selectedDiscountData) {
                const discountFactor = selectedDiscountData.discountPercentage / 100;
                const discountedPrice = selectedTicket.price * discountFactor;
                setFinalPrice(discountedPrice);
            }
        }
    }

    const handleSummaryPurchase = () => {
        if (!showDate && selectedRelief) {
            if (selectedTicket.lines === "1" && selectedLines) {
                navigation.navigate("SummaryPurchaseScreen",{
                    selectedTicket: selectedTicket,
                    selectedLines: selectedLines || 0,
                    selectedRelief: selectedRelief || "",
                    finalPrice: finalPrice,
                });
            } else {
                let lineNumber = lineObj?._id;
                navigation.navigate("SummaryPurchaseScreen",{
                    selectedTicket: selectedTicket,
                    selectedLines: lineNumber || 0,
                    selectedRelief: selectedRelief || "",
                    finalPrice: finalPrice,
                });
            }
        } else if ( showDate && selectedRelief) {
            if (selectedTicket.lines === "1" && selectedLines) {
                navigation.navigate("SummaryPurchaseScreen",{
                    selectedTicket: selectedTicket,
                    selectedLines: selectedLines || 0,
                    selectedRelief: selectedRelief || "",
                    selectedDate: selectedDate.toISOString(),
                    finalPrice: finalPrice,
                });
            } else {
                let lineNumber = lineObj?._id;
                navigation.navigate("SummaryPurchaseScreen",{
                    selectedTicket: selectedTicket,
                    selectedLines: lineNumber || 0,
                    selectedRelief: selectedRelief || "",
                    selectedDate: selectedDate.toISOString(),
                    finalPrice: finalPrice,
                });
            }
        } else {
            console.log("Uzupełnij wszystkie pola");
        }
    };

    useEffect (() => {
        if (selectedTicket.lines === "1") {
            return setLineText("jedną linię")
        } else {
            return setLineText(selectedTicket.lines + " linie")
        }
    });

    return (
        <SafeAreaView style={stylesApp.container}>

            <Header title="Koszyk" />

            <Text style={stylesApp.normalH3}>Wybrany bilet</Text>
            <View style={stylesApp.ticketBox}>
                <Mci name={"bus-stop"} size={50} style={stylesApp.ticketIcon}/>
                { singleTicket && selectedTicket.period == null ? (
                <View>
                    <Text style={stylesApp.itemText}>Bilet {selectedTicket.type}</Text>
                    <Text style={stylesApp.itemText}>Na { lineText }</Text>
                </View>
            ) : singleTicket ? (
                <View>
                    <Text style={stylesApp.itemText}>Bilet {selectedTicket.type}</Text>
                    <Text style={stylesApp.itemText}>{selectedTicket.period}-minutowy na { lineText } </Text>
                </View>
            ):(
                <View>
                    <Text style={stylesApp.itemText}>Bilet {selectedTicket.type}</Text>
                    <Text style={stylesApp.itemText}>{selectedTicket.period}-miesięczny na { lineText }</Text>
                </View>
            )}
            </View>



            <View style={stylesApp.separator} />
            <Text style={stylesApp.normalH3}>Podaj więcej informacji</Text>

            <View style={stylesApp.contentBox}>

                { seasonTicket && (
                    <DateSelector
                        showDate={showDate}
                        setShowDate={setShowDate}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}/>
                )}

                { numberSelectedLines === "1" && (
                    <DropdownSelector
                        selectedValue={selectedLines}
                        setSelectedValue={setSelectedLines}
                        data={filteredLines}
                        placeholder="Wybierz linię"
                    />
                )}

                <DropdownSelector
                    selectedValue={selectedRelief}
                    setSelectedValue={setSelectedRelief}
                    data={filteredDiscounts}
                    placeholder="Wybierz ulgę"
                    onChangeValueFunction={finalSummary}
                />


            </View>

                <View style={stylesApp.summaryBox}>
                    <Text style={stylesApp.finalPrice}>Cena biletu: <Text
                        style={stylesApp.boldText}>{finalPrice.toFixed(2)} zł</Text></Text>

                    <TouchableOpacity onPress={handleSummaryPurchase} style={stylesApp.mainButton}>
                        <Text style={stylesApp.whiteBoldCenterText}>Podsumowanie transakcji</Text>
                    </TouchableOpacity>
                </View>


        </SafeAreaView>
    );
};

export default SelectingPurchaseConfiguration;

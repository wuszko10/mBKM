import React,{ useMemo,useState } from "react";
import { FlatList,SafeAreaView,StyleSheet,Text,TouchableOpacity,View } from "react-native";
import { colors } from "../style/styleValues.js";
import DropDownPicker from 'react-native-dropdown-picker';
import { Ticket } from "../repositories/interfaces.tsx";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { discounts,ticketsData } from "../repositories/Data.tsx";

type RootStackParamList = {
    Purchase: undefined;
    SummaryPurchaseScreen: {selectedTicket: Ticket, selectedDiscount: string, finalPrice: number};
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'SummaryPurchaseScreen'>;

const Purchase = () => {

    const navigation = useNavigation<NavigationProp>();

    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
    const [openDiscountPicker, setOpenDiscountPicker] = useState(false);
    const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);
    const [finalPrice, setFinalPrice] = useState<number | null>(null);
    const [singleTicket, setSingleTicket] = useState(false);
    const [seasonTicket, setSeasonTicket] = useState(false);


    function handleSingleTicket(){
        setSingleTicket(!singleTicket);
        if(seasonTicket){
            setSeasonTicket(!seasonTicket);
        }
        setSelectedDiscount(null);
        setFinalPrice(null);
        setOpenDiscountPicker(false);
    }

    function handleSeasonTicket() {
        setSeasonTicket(!seasonTicket);
        if(singleTicket){
            setSingleTicket(!singleTicket);
        }
        setSelectedDiscount(null);
        setFinalPrice(null);
        setOpenDiscountPicker(false);
    }

    const filteredTickets = ticketsData.filter((ticket) => {
        if (singleTicket && ticket.type === 'jednorazowy') {
            return true;
        }
        if (seasonTicket && ticket.type === 'okresowy') {
            return true;
        }
        return false;
    });

    const filteredDiscounts = discounts
        .filter(discount => (singleTicket && discount.type === "jednorazowy") || (seasonTicket && discount.type === "okresowy"))
        .map(discount => ({
            label: discount.name+" ("+discount.discountPercentage+"%)",
            value: discount._id
        }));

    const calculateFinalPrice = () => {
        if (selectedTicket && selectedDiscount) {
            const selectedDiscountData = discounts.find(discount => discount._id === selectedDiscount);
            if (selectedDiscountData) {
                const discountFactor = selectedDiscountData.discountPercentage / 100;
                const discountedPrice = selectedTicket.price * discountFactor;
                setFinalPrice(discountedPrice);
            }
        }
    };

    const handleTicketSelect = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setSelectedTicketId(ticket._id);
        setOpenDiscountPicker(false);
    };

    const handleSummaryPurchase = () => {
        if (selectedTicket && selectedDiscount && finalPrice !== null) {
            navigation.navigate('SummaryPurchaseScreen', {
                selectedTicket,
                selectedDiscount,
                finalPrice
            });
        } else {
            console.log('Brak wystarczających danych do podsumowania transakcji.');
        }
    };

    return (
        <SafeAreaView>
            <Text>Kup bilet</Text>

            <View>
                <Text>Wybierz rodzaj biletu</Text>
                <View>
                    <TouchableOpacity onPress={handleSingleTicket} style={singleTicket ? localStyle.ticketActiveItem : localStyle.ticketItem}>
                        <Text>Bilet jednorazowy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSeasonTicket} style={seasonTicket ? localStyle.ticketActiveItem : localStyle.ticketItem}>
                        <Text>Bilet okresowy</Text>
                    </TouchableOpacity>
                </View>

                {singleTicket || seasonTicket ?(
                    <View>
                        <FlatList
                            data={filteredTickets}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleTicketSelect(item)} style={[
                                        localStyle.item,
                                    selectedTicketId === item._id && localStyle.selectedItem
                                    ]}>
                                    <Text style={localStyle.itemText}>Bilet {item.type}</Text>
                                    <Text style={localStyle.itemText}>Linie: {item.lines}</Text>
                                    {item.period != null ? (<Text style={localStyle.itemText}>Okres: {item.period}{item.type === "jednorazowy" ? "-minutowy" : "-miesięczny"}</Text>) : null}
                                    <Text style={localStyle.itemText}>Cena biletu normalnego: {item.price} PLN</Text>
                                </TouchableOpacity>
                            )}
                        />

                        <DropDownPicker
                            open={openDiscountPicker}
                            value={selectedDiscount}
                            items={filteredDiscounts}
                            setOpen={setOpenDiscountPicker}
                            setValue={setSelectedDiscount}
                            placeholder="Wybierz ulgę"
                            style={localStyle.dropdown}
                            dropDownContainerStyle={localStyle.dropdownContainer}
                            onChangeValue={calculateFinalPrice}
                        />
                    </View>
                ): null}

            </View>
            {finalPrice !== null && (
                <View>
                    <Text>Cena końcowa: {finalPrice.toFixed(2)} PLN</Text>

                    {/* Przycisk do przejścia do podsumowania transakcji */}
                    <TouchableOpacity
                        onPress={handleSummaryPurchase}
                    >
                        <Text>Podsumowanie transakcji</Text>
                    </TouchableOpacity>
                </View>
            )}

        </SafeAreaView>
    );
};

const localStyle = StyleSheet.create({
    ticketItem: {
        backgroundColor: colors.appThirdColor,
    },

    ticketActiveItem: {
        backgroundColor: colors.appBg,
    },
    item: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        marginVertical: 5,
        borderRadius: 5,
    },
    selectedItem: {
        backgroundColor: '#b0e0ff',
    },
    itemText: {
        fontSize: 16,
    },
    dropdown: {
        marginVertical: 10,
        backgroundColor: '#f0f0f0',
    },
    dropdownContainer: {
        backgroundColor: '#f0f0f0',
    },
});

export default Purchase;

import React,{ useState } from "react";
import { FlatList,StyleSheet,Text,TouchableOpacity,View } from "react-native";
import { colors,dimensions } from "../style/styleValues.js";
import stylesApp from "../style/stylesApp.js";
import DropDownPicker from "react-native-dropdown-picker";
import { discounts,ticketsData } from "../repositories/Data.tsx";
import { Ticket } from "../repositories/interfaces.tsx";

type TicketAndReliefTypeSelectorProps = {
    setSelectedTicket: React.Dispatch<React.SetStateAction<Ticket | null>>;
    selectedTicketId: string | null;
    setSelectedTicketId: React.Dispatch<React.SetStateAction<string | null>>;
    selectedDiscount: string | null;
    setSelectedDiscount: React.Dispatch<React.SetStateAction<string | null>>;
    singleTicket: boolean;
    seasonTicket: boolean;
    setFinalPrice: React.Dispatch<React.SetStateAction<number | null>>;
    calculateFinalPrice: () => void;
};
const TicketAndReliefTypeSelector: React.FC<TicketAndReliefTypeSelectorProps> = (
    {
        setSelectedTicket,
        selectedTicketId,
        setSelectedTicketId,
        selectedDiscount,
        setSelectedDiscount,
        singleTicket,
        seasonTicket,
        calculateFinalPrice
    }) => {

    const [openDiscountPicker, setOpenDiscountPicker] = useState(false);

    const filteredTickets = ticketsData.filter((ticket) => {
        if (singleTicket && ticket.type === 'jednorazowy') {
            return true;
        }
        return seasonTicket && ticket.type === 'okresowy';
    });

    const filteredDiscounts = discounts
        .filter(discount => (singleTicket && discount.type === "jednorazowy") || (seasonTicket && discount.type === "okresowy"))
        .map(discount => ({
            label: discount.name+" ("+discount.discountPercentage+"%)",
            value: discount._id
        }));


    const handleTicketSelect = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setSelectedTicketId(ticket._id);
        setOpenDiscountPicker(false);
    };

    return (
        <View>
            <FlatList
                data={filteredTickets}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleTicketSelect(item)} style={[
                        stylesApp.flatlistItem,
                        selectedTicketId === item._id && localStyle.selectedItem
                    ]}>
                        <Text style={localStyle.itemText}>Bilet <Text style={stylesApp.boldText}>{item.type}</Text></Text>
                        <Text style={localStyle.itemText}>Linie: <Text style={stylesApp.boldText}>{item.lines}</Text></Text>
                        {item.period != null ? (<Text style={localStyle.itemText}>Okres: <Text style={stylesApp.boldText}>{item.period}{item.type === "jednorazowy" ? "-minutowy" : "-miesięczny"}</Text></Text>) : null}
                        <Text style={localStyle.itemText}>Cena biletu normalnego: <Text style={stylesApp.boldText}>{item.price.toFixed(2)} zł</Text></Text>
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
    )

}

const localStyle = StyleSheet.create({
    selectedItem: {
        backgroundColor: '#b0e0ff',
    },

    itemText: {
        fontSize: 16,
        color: colors.textColorBlack,
    },
    dropdown: {
        marginVertical: 10,
        backgroundColor: colors.appThirdColor,
        borderWidth: 0,
        borderRadius: dimensions.radius,
    },
    dropdownContainer: {
        backgroundColor: colors.appThirdColor,
        borderWidth: 0,
        marginTop: 15,
        padding: 5,
    },
})

export default TicketAndReliefTypeSelector

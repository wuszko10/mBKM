// usePurchaseLogic.ts
import { useState } from "react";
import { Ticket } from "../../repositories/interfaces.tsx";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { discounts } from "../../repositories/Data.tsx";

type RootStackParamList = {
    Purchase: undefined;
    SummaryPurchaseScreen: {selectedTicket: Ticket, selectedDiscount: string, selectedDate?: string, finalPrice: number};
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Purchase'>;

export const usePurchaseLogic = () => {

    const navigation = useNavigation<NavigationProp>();

    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
    const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);
    const [finalPrice, setFinalPrice] = useState<number | null>(null);
    const [singleTicket, setSingleTicket] = useState(false);
    const [seasonTicket, setSeasonTicket] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);

    function resetData() {
        setSelectedDiscount(null);
        setFinalPrice(null);
        setSelectedTicketId(null);
        setShowDate(false);
    }

    function resetTicket() {
        setSingleTicket(false);
        setSeasonTicket(false);
    }

    function handleSingleTicket() {
        setSingleTicket(!singleTicket);
        if (seasonTicket) {
            setSeasonTicket(!seasonTicket);
        }
        resetData();
    }

    function handleSeasonTicket() {
        setSeasonTicket(!seasonTicket);
        if (singleTicket) {
            setSingleTicket(!singleTicket);
        }
        resetData();
    }

    const finalSummary = () => {
        if (selectedTicket && selectedDiscount) {
            const selectedDiscountData = discounts.find(discount => discount._id === selectedDiscount);
            if (selectedDiscountData) {
                const discountFactor = selectedDiscountData.discountPercentage / 100;
                const discountedPrice = selectedTicket.price * discountFactor;
                setFinalPrice(discountedPrice);
            }
        }
    }

    const calculateFinalPrice = () => {
        if (seasonTicket && showDate && !singleTicket)
            finalSummary();
        if (singleTicket && !seasonTicket)
            finalSummary();
    };
    const handleSummaryPurchase = () => {
        if (selectedTicket && selectedDiscount && finalPrice !== null && !showDate) {
            navigation.navigate('SummaryPurchaseScreen', {
                selectedTicket,
                selectedDiscount,
                finalPrice
            });
            resetData();
            resetTicket();
        } else if (selectedTicket && selectedDiscount && showDate && finalPrice !== null) {
            navigation.navigate('SummaryPurchaseScreen', {
                selectedTicket,
                selectedDiscount,
                selectedDate: selectedDate.toLocaleString(),
                finalPrice
            });
            resetData();
            resetTicket();
        } else {
            console.log('Brak wystarczających danych do podsumowania transakcji.');
        }
    };

    return {
        selectedTicket,
        setSelectedTicket,
        selectedTicketId,
        setSelectedTicketId,
        selectedDiscount,
        setSelectedDiscount,
        singleTicket,
        seasonTicket,
        setSingleTicket,
        setSeasonTicket,
        finalPrice,
        setFinalPrice,
        selectedDate,
        setSelectedDate,
        showDate,
        setShowDate,
        handleSingleTicket,
        handleSeasonTicket,
        handleSummaryPurchase,
        calculateFinalPrice,
    };
};

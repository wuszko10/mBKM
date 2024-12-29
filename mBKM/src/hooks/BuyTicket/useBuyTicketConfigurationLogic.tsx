import {useEffect, useState} from "react";
import {FilterMapListType, Line, Relief, Ticket} from "../../types/interfaces.tsx";
import { ALL_LINES,DEFAULT_RELIEF,ONE_LINE,SEASON_TICKET,SINGLE_TICKET } from "../../../variables.tsx";
import { storage } from "../../../App.tsx";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types/navigation.tsx";
import { ToastAndroid } from "react-native";

export const useBuyTicketConfigurationLogic = (selectedTicket: Ticket) => {

    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation<NavigationProp>();

    const [showDate, setShowDate] = useState(false);
    const [reliefs, setReliefs] = useState<Relief[]>();
    const [reliefsData, setReliefsData] = useState<FilterMapListType[]>();
    const [linesData, setLinesData] = useState<FilterMapListType[]>();
    const [selectedRelief, setSelectedRelief] = useState<string | null>(null);
    const [selectedLines, setSelectedLines] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState(new(Date));
    const [finalPrice, setFinalPrice] = useState(0);
    const getReliefsAndLines = () => {

        if(!isLoading) return;

        const reliefStr = storage.getString('reliefs');
        const lineStr = storage.getString('lines');

        if (reliefStr && lineStr) {
            const parseRelief: Relief[] = JSON.parse(reliefStr);
            const parseLines: Line[] = JSON.parse(lineStr);

            const filteredReliefs = parseRelief
                .filter(r =>
                    selectedTicket.typeName === SINGLE_TICKET
                        ? (r.ticketTypeName === SINGLE_TICKET || r.ticketTypeName === ALL_LINES)
                        : (r.ticketTypeName === SEASON_TICKET || r.ticketTypeName === ALL_LINES))
                .map(r => ({
                    label: r.name+" ("+r.percentage+"%)",
                    value: r._id,
                    key: r.typeName,
                }));

            const filteredLines = parseLines
                .filter(line =>
                    selectedTicket.lineName === ALL_LINES
                        ? line.number === ALL_LINES
                        : line.number !== ALL_LINES
                )
                .map(line => ({
                    label: line.name,
                    value: line.id,
                    key: line.number,
                }));

            setReliefsData(filteredReliefs);
            setLinesData(filteredLines);
            setReliefs(parseRelief);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getReliefsAndLines();
    }, [isLoading]);

    useEffect(() => {
        if(reliefsData)
        {
            const defaultRelief = reliefsData.find(r => r.key === DEFAULT_RELIEF);
            if (defaultRelief) {
                setSelectedRelief(defaultRelief.value);
            }
        }

        if(linesData){
            const defaultLine = linesData.find(l => l.key === ALL_LINES)
            if (defaultLine) {
                setSelectedLines(defaultLine.value);
            }
        }
    }, [reliefsData, linesData]);

    useEffect(() => {
        if (selectedRelief && reliefs) {
            const selectedReliefData = reliefs.find(r => r._id === selectedRelief);
            if (selectedReliefData) {
                const discountFactor = selectedReliefData.percentage / 100;
                setFinalPrice(selectedTicket.price * discountFactor);
            }
        }
    }, [selectedRelief, reliefs]);

    const handleSummaryPurchase = () => {

        if (selectedTicket.typeName === SEASON_TICKET && !showDate) {
            ToastAndroid.show('Wybierz datę', ToastAndroid.SHORT);
            return;
        }

        if (selectedTicket.lineName === ONE_LINE && !selectedLines) {
            ToastAndroid.show('Wybierz linię', ToastAndroid.SHORT);
            return;
        }

        if (!selectedRelief) {
            ToastAndroid.show('Wybierz ulgę', ToastAndroid.SHORT);
            return;
        }

        const data = {
            selectedTicket: selectedTicket,
            selectedLines: selectedLines,
            selectedRelief: reliefs?.find(r => r._id === selectedRelief),
            finalPrice: finalPrice,
            ...(selectedTicket.typeName === SEASON_TICKET && { selectedDate: selectedDate.toISOString() }),
        };

        navigation.navigate("BuyTicketSummary", data);
    };


    return {
        showDate,
        isLoading,
        reliefs,
        reliefsData,
        linesData,
        selectedDate,
        selectedLines,
        selectedRelief,
        finalPrice,
        setShowDate,
        setSelectedDate,
        setSelectedRelief,
        setSelectedLines,
        handleSummaryPurchase,
    };
}

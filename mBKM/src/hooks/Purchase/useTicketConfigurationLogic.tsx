import {useEffect, useState} from "react";
import {FilterMapListType, Line, Relief, Ticket} from "../../types/interfaces.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ALL_LINES, SEASON_TICKET, SINGLE_TICKET} from "../../repositories/variables.tsx";

export const useTicketConfigurationLogic = (selectedTicket: Ticket) => {

    const [isLoading, setIsLoading] = useState(false);

    const [showDate, setShowDate] = useState(false);
    const [reliefs, setReliefs] = useState<Relief[]>();
    const [reliefsData, setReliefsData] = useState<FilterMapListType[]>();
    const [linesData, setLinesData] = useState<FilterMapListType[]>();
    const [selectedRelief, setSelectedRelief] = useState<string | null>(null);
    const [selectedLines, setSelectedLines] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState(new(Date));
    const [finalPrice, setFinalPrice] = useState(0);

    const getReliefsAndLines = async () => {

        let reliefStr = await AsyncStorage.getItem('reliefTypes');
        let lineStr = await AsyncStorage.getItem('lines');
        if (reliefStr !== null && lineStr) {
            let parseRelief: Relief[] = JSON.parse(reliefStr);
            let parseLines: Line[] = JSON.parse(lineStr);

            const filteredReliefs = parseRelief
                .filter(r => (r.ticketTypeName === SINGLE_TICKET) || (r.ticketTypeName === SEASON_TICKET))
                .map(r => ({
                    label: r.name+" ("+r.discountPercentage+"%)",
                    value: r._id
                }));

            const filteredLines = parseLines
                .filter(line => !(line.number === ALL_LINES))
                .map(line => ({
                    label: line.name,
                    value: String(line._id)
                }));

            setReliefsData(filteredReliefs);
            setLinesData(filteredLines);
            setReliefs(parseRelief);
            setIsLoading(true);
        }
    }

    useEffect(() => {
        getReliefsAndLines();
    }, []);

    useEffect(() => {
        if (selectedTicket && selectedRelief && reliefs) {
            const selectedReliefData = reliefs.find(r => r._id === selectedRelief);
            if (selectedReliefData) {
                const discountFactor = selectedReliefData.discountPercentage / 100;
                setFinalPrice(selectedTicket.price * discountFactor);
            }
        }
    }, [selectedTicket, selectedRelief]);

    return {
        showDate,
        isLoading,
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
    };
}

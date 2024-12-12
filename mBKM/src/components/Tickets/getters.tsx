import AsyncStorage from "@react-native-async-storage/async-storage";
import {FilterMapListType, Line, Relief} from "../../types/interfaces.tsx";
import {ALL_LINES, SEASON_TICKET, SINGLE_TICKET} from "../../repositories/variables.tsx";

export const getReliefsAndLines = async () => {

    let reliefStr = await AsyncStorage.getItem('reliefTypes');
    let lineStr = await AsyncStorage.getItem('lines');
    if (reliefStr !== null && lineStr) {
        let parseRelief: Relief[] = JSON.parse(reliefStr);
        let parseLines: Line[] = JSON.parse(lineStr);

        const filteredReliefs : FilterMapListType[] = parseRelief
            .filter(r => (r.ticketTypeName === SINGLE_TICKET) || (r.ticketTypeName === SEASON_TICKET))
            .map(r => ({
                label: r.name+" ("+r.discountPercentage+"%)",
                value: r._id
            }));

        const filteredLines : FilterMapListType[] = parseLines
            .filter(line => !(line.number === ALL_LINES))
            .map(line => ({
                label: line.name,
                value: String(line._id)
            }));

        return {
            filteredReliefs,
            filteredLines
        }
    }
}

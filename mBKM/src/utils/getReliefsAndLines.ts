import {Line,Relief,Ticket} from "../types/interfaces.tsx";
import {ALL_LINES,SEASON_TICKET,SINGLE_TICKET} from "../../variables.tsx";

export const getReliefsAndLines = (selectedTicket: Ticket, parseRelief: Relief[], parseLines: Line[]) => {

        const filteredReliefs = parseRelief
            .filter(r =>
                selectedTicket.typeName === SINGLE_TICKET
                    ? ((r.ticketTypeName === SINGLE_TICKET || r.ticketTypeName === ALL_LINES) && r.isActive )
                    : ((r.ticketTypeName === SEASON_TICKET || r.ticketTypeName === ALL_LINES) && r.isActive ))
            .map(r => ({
                label: r.name+" ("+r.percentage+"%)",
                value: r._id,
                key: r.typeName,
            }));

        const filteredLines = parseLines
            .filter(line =>
                selectedTicket.lineName === ALL_LINES
                    ? (line.number === ALL_LINES && line.isActive)
                    : (line.number !== ALL_LINES && line.isActive)
            )
            .map(line => ({
                label: line.name,
                value: line.id,
                key: line.number,
            }));

        return{
            filteredReliefs,
            filteredLines,
        }
}

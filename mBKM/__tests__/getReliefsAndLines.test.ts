import {describe,expect,it,jest} from "@jest/globals";
import { getReliefsAndLines } from '../src/utils/getReliefsAndLines';
import { storage } from '../App';
import {beforeEach} from "node:test";
import {ALL_LINES,SEASON_TICKET,SINGLE_TICKET} from "../variables.tsx";
import {Ticket} from "../src/types/interfaces.tsx";

jest.mock('../App', () => ({
    storage: {
        getString: jest.fn(),
    },
}));

describe('Get reliefs and lines from storage - unit test', () => {

    const mockTicket: Ticket = {
        type: "",
        _id: "1",
        typeName: SINGLE_TICKET,
        lineName: ALL_LINES,
        lines: "",
        price: 1,
        offerStartDate: "",
        typeLabel: "",
        periodName: "",
        periodLabel: "",
        lineLabel: ""
    }

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return filtered reliefs and lines', () => {
        const mockReliefs = JSON.stringify([
            {
                _id: '1',
                name: 'Student',
                type: "",
                isActive: "",
                ticketType: "",
                percentage: 50,
                typeName: "",
                typeLabel: "",
                ticketTypeName: SINGLE_TICKET,
                ticketTypeLabel: "",
            },
            {
                _id: '2',
                name: 'Senior',
                type: "",
                isActive: "",
                ticketType: "",
                percentage: 30,
                typeName: "",
                typeLabel: "",
                ticketTypeName: SEASON_TICKET,
                ticketTypeLabel: "",
            },
            {
                _id: '3',
                name: 'Other',
                type: "",
                isActive: "",
                ticketType: "",
                percentage: 10,
                typeName: "",
                typeLabel: "",
                ticketTypeName: 'OTHER_TICKET',
                ticketTypeLabel: "",
            },
        ]);

        const mockLines = JSON.stringify([
            { id: 1, name: 'Line 1', number: '1', isActive: true },
            { id: 2, name: 'Line 2', number: ALL_LINES, isActive: true },
            { id: 3, name: 'Line 3', number: '3', isActive: true },
        ]);

        (storage.getString as jest.Mock)
            .mockImplementationOnce(() => mockReliefs) // reliefTypes
            .mockImplementationOnce(() => mockLines);  // lines

        const result = getReliefsAndLines(mockTicket, JSON.parse(mockReliefs), JSON.parse(mockLines));

        expect(result).toEqual({
            filteredLines: [
                {
                    key: "all",
                    label: "Line 2",
                    value: 2
                }
            ],
            filteredReliefs: []
        });
    });

});

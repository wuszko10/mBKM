import {describe,expect,it,jest} from "@jest/globals";
import {renderHook, act} from "@testing-library/react-native";
import { useNavigation } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';
import checkInternetConnection from "../src/utils/network.tsx";
import {useBuyTicketSummaryLogic} from "../src/hooks/BuyTicket/useBuyTicketSummaryLogic.tsx";
import {Line,Relief,Ticket} from "../src/types/interfaces.tsx";
import {ALL_LINES,SINGLE_TICKET} from "../variables.tsx";
import {beforeEach} from "node:test";
import {addTransaction} from "../src/services/transaction.service.tsx";

jest.mock('axios');

jest.mock('../App', () => ({
    storage: {
        getString: jest.fn(),
    },
}));

jest.mock('../src/utils/network', () => jest.fn());

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn().mockReturnValue({
        navigate: jest.fn(),
    }),
}))

jest.mock('react-native', () => ({
    ToastAndroid: {
        show: jest.fn(),
    },
}));

jest.mock('../src/services/transaction.service', () => ({
    addTransaction: jest.fn() as jest.MockedFunction<
        (ticketId: string, finalPrice: number, paymentMethodId: string, userId: string, statusId: string, selectedDate: string | undefined, selectedRelief: string, selectedLines: string, token: string | null) => Promise<any>
    >,
}));


describe('useBuyTicketSummaryLogic', () => {
    const selectedTicket: Ticket = {
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
    };
    const selectedLines:Line = { id: '1', name: 'Line 1', number: '1', isActive: true };
    const selectedRelief: Relief = {_id: '1',
        name: 'Student',
        type: "",
        isActive: true,
        ticketType: "",
        percentage: 50,
        typeName: "",
        typeLabel: "",
        ticketTypeName: SINGLE_TICKET,
        ticketTypeLabel: "", };
    const selectedDate = '2025-01-20';
    const finalPrice = 100;
    const userId = 'user123';
    const token = 'token123';

    beforeEach(() => {
        (checkInternetConnection as jest.MockedFunction<() => Promise<boolean>>).mockClear();
        (addTransaction as jest.MockedFunction<any>).mockClear();
    });

    it('should navigate to PaymentScreen when handleBuyTicket is called', async () => {

        const mockNavigate = jest.fn();
        (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
        (checkInternetConnection as jest.MockedFunction<() => Promise<boolean>>).mockResolvedValue(true);

        const mockResponse = { transactionId: 'tx123', transactionNumber: 'TX123', transactionAmount: 100, userTicketId: 'userTicket123' };
        (addTransaction as jest.MockedFunction<typeof addTransaction>).mockResolvedValue(mockResponse);

        const { result } = renderHook(() =>
            useBuyTicketSummaryLogic(
                selectedTicket,
                selectedLines,
                selectedRelief,
                selectedDate,
                finalPrice,
                userId,
                token
            )
        );

        act(() => {
            result.current.setPaymentMethodId('methodId');
        });
        await act(async () => {
            await result.current.handleBuyTicket();
        });

        expect(mockNavigate).toHaveBeenCalledWith('PaymentScreen', {
            transactionId: 'tx123',
            transactionNumber: 'TX123',
            paymentMethodId: 'methodId',
            transactionAmount: 100,
            userTicketId: 'userTicket123',
        });

        expect(ToastAndroid.show).not.toHaveBeenCalled();

        expect(addTransaction).toHaveBeenCalledWith(
            selectedTicket._id,
            finalPrice,
            'methodId',
            userId,
            expect.anything(),
            selectedDate,
            selectedRelief._id,
            selectedLines.id,
            token
        );
    });

    it('should show error message when transaction creation fails', async () => {
        const mockNavigate = jest.fn();
        (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
        (checkInternetConnection as jest.MockedFunction<() => Promise<boolean>>).mockResolvedValue(true);

        (addTransaction as jest.MockedFunction<typeof addTransaction>).mockResolvedValue(null);

        const { result } = renderHook(() =>
            useBuyTicketSummaryLogic(
                selectedTicket,
                selectedLines,
                selectedRelief,
                selectedDate,
                finalPrice,
                userId,
                token
            )
        );

        act(() => {
            result.current.setPaymentMethodId('methodId');
        });
        await act(async () => {
            await result.current.handleBuyTicket();
        });

        expect(ToastAndroid.show).toHaveBeenCalledWith('Błąd tworzenia transakcji', ToastAndroid.SHORT);
        expect(mockNavigate).not.toHaveBeenCalled();
        expect(addTransaction).toHaveBeenCalledWith(
            selectedTicket._id,
            finalPrice,
            'methodId',
            userId,
            expect.anything(),
            selectedDate,
            selectedRelief._id,
            selectedLines.id,
            token
        );
    });

    it('should show "Wybierz metodę płatności" when no payment method is selected', async () => {
        const mockNavigate = jest.fn();
        (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
        (checkInternetConnection as jest.MockedFunction<() => Promise<boolean>>).mockResolvedValue(true);

        const { result } = renderHook(() =>
            useBuyTicketSummaryLogic(
                selectedTicket,
                selectedLines,
                selectedRelief,
                selectedDate,
                finalPrice,
                userId,
                token
            )
        );

        await act(async () => {
            await result.current.handleBuyTicket();
        });

        expect(ToastAndroid.show).toHaveBeenCalledWith('Wybierz metodę płatności', ToastAndroid.SHORT);

        expect(mockNavigate).not.toHaveBeenCalled();
    });

});

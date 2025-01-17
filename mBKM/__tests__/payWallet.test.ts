import {describe,expect,it,jest} from "@jest/globals";
import {WalletPaymentProps} from "../src/components/Payments/WalletPayment.tsx";
import {beforeEach} from "node:test";
import checkInternetConnection from "../src/utils/network.tsx";
import {act,renderHook} from "@testing-library/react-native";
import {useWalletPaymentLogic} from "../src/hooks/Payment/useWalletPaymentLogic.tsx";
import {payWallet} from "../src/services/payment.service.tsx";
import {useNavigation} from "@react-navigation/native";
import {WalletDAO} from "../src/types/interfaces.tsx";
import {checkLocation} from "../src/utils/CheckLocation.ts";
import {storage} from "../App.tsx";

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
    CommonActions: {
        reset: jest.fn()
    }
}));

jest.mock('../App', () => ({
    storage: {
        getString: jest.fn(),
        set: jest.fn(),
    },
}));

jest.mock('../src/hooks/Ticket/useLocalStops', () => ({
    useLocalStops: jest.fn().mockReturnValue({
        stops: jest.fn()
    }),
}));

jest.mock('axios');
jest.mock('../src/utils/network', () => jest.fn());
jest.mock('../src/utils/CheckLocation', () => ({
    checkLocation: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn().mockReturnValue({
        navigate: jest.fn(),
    }),
}));

jest.mock('../src/services/payment.service', () => ({
    payWallet: jest.fn() as jest.MockedFunction<
        (amount: number, transactionId: string, walletId: string, userTicketId: string, token: string) => Promise<any>
    >,
}));

describe('useWalletPaymentLogic', () => {
    const mockWallet: WalletDAO = {
        id: 'wallet123',
        amount: 100,
        userId: "testUserID",
    };

    const mockProps: WalletPaymentProps = {
        closePopup: jest.fn(),
        transactionAmount: 50,
        transactionId: 'tx123',
        userTicketId: 'ticket123',
        setStopPayment: jest.fn(),
        setWalletPayment: jest.fn()
    };

    beforeEach(() => {
        (checkInternetConnection as jest.MockedFunction<() => Promise<boolean>>).mockClear();
        (checkLocation as jest.MockedFunction<() => Promise<boolean>>).mockClear();
        (payWallet as jest.MockedFunction<any>).mockClear();
    });

    it('should process wallet payment correctly', async () => {

        const mockNavigate = jest.fn();
        (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
        (checkInternetConnection as jest.MockedFunction<() => Promise<boolean>>).mockResolvedValue(true);
        (checkLocation as jest.MockedFunction<() => Promise<boolean>>).mockResolvedValue(true);

        const mockResponse = { id: 'wallet123',
            amount: 100,
            userId: "testUserID"};
        (payWallet as jest.MockedFunction<typeof payWallet>).mockResolvedValue(mockResponse);

        const { result } = renderHook(() =>
            useWalletPaymentLogic(mockProps, mockWallet, jest.fn(), 'fake-token')
        );

        await act(async () => {
            await result.current.handleWalletPayment();
        });

        expect(storage.set).toHaveBeenCalledWith('wallet', JSON.stringify(mockWallet));
        expect(checkLocation).toHaveBeenCalled();

        expect(result.current.showPaymentPopup).toBe(false);
        expect(result.current.paymentPopupText).toBe('');
        expect(result.current.popupText).toBe('Czy chcesz skasować bilet?');
        expect(result.current.showPopup).toBe(true);

    });

    it('should show success message when payment is processed successfully', async () => {
        const mockNavigate = jest.fn();
        (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
        (checkInternetConnection as jest.MockedFunction<() => Promise<boolean>>).mockResolvedValue(true);
        (checkLocation as jest.MockedFunction<() => Promise<boolean>>).mockResolvedValue(false);

        const mockResponse = { id: 'wallet123', amount: 100, userId: "testUserID" };
        (payWallet as jest.MockedFunction<typeof payWallet>).mockResolvedValue(mockResponse);

        const { result } = renderHook(() =>
            useWalletPaymentLogic(mockProps, mockWallet, jest.fn(), 'fake-token')
        );

        await act(async () => {
            await result.current.handleWalletPayment();
        });

        expect(storage.set).toHaveBeenCalledWith('wallet', JSON.stringify(mockWallet));
        expect(checkLocation).toHaveBeenCalled();

        expect(result.current.showPaymentPopup).toBe(true);
        expect(result.current.popupText).toBe('');
        expect(result.current.paymentPopupText).toBe('Transakcja zakończona pomyślnie!');
    });

    it('should show error message when payment processing fails', async () => {
        const mockNavigate = jest.fn();
        (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
        (checkInternetConnection as jest.MockedFunction<() => Promise<boolean>>).mockResolvedValue(true);

        (payWallet as jest.MockedFunction<typeof payWallet>).mockRejectedValue(new Error('Payment failed'));

        const { result } = renderHook(() =>
            useWalletPaymentLogic(mockProps, mockWallet, jest.fn(), 'fake-token')
        );

        await act(async () => {
            await result.current.handleWalletPayment();
        });

        expect(result.current.paymentPopupText).toBe('Wystąpił błąd podczas przetwarzania płatności.');
    });
});

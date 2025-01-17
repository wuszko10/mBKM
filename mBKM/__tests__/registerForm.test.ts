import {describe,expect,it,jest} from "@jest/globals";
import {renderHook, act} from "@testing-library/react-native";
import {useRegisterLogic} from "../src/hooks/User/useRegisterLogic.tsx";
import checkInternetConnection from "../src/utils/network.tsx";
import {userRegister} from "../src/services/user.service.tsx";
import {beforeEach} from "node:test";
import {useNavigation} from "@react-navigation/native";
import {ToastAndroid} from "react-native";

jest.mock('axios');

jest.mock('../src/utils/network', () => jest.fn());

jest.mock('../src/services/user.service', () => ({
    userRegister: jest.fn() as jest.MockedFunction<
        (firstName: string, lastName: string, pesel: string, email: string, password: string, fullAddress: string, town: string, postalCode: string, postal: string) => Promise<any>
    >,
}));

jest.mock('react-native', () => ({
    ToastAndroid: {
        show: jest.fn(),
    },
}));

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn().mockReturnValue({
        navigate: jest.fn(),
    }),
}));

describe('register - test', () => {

    beforeEach(() => {
        (checkInternetConnection as jest.MockedFunction<() => Promise<boolean>>).mockClear();
        (userRegister as jest.MockedFunction<any>).mockClear();
    });

    it('should call userRegister if internet is connected and form is valid',async () => {

        (checkInternetConnection as jest.MockedFunction<() => Promise<boolean>>).mockResolvedValue(true);
        const mockResponse = { success: true };
        (userRegister as jest.MockedFunction<typeof userRegister>).mockResolvedValue(mockResponse);

        const mockNavigate = jest.fn();
        (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });

        const handleChangeRoute = jest.fn();

        const { result } = renderHook(() => {
            const logic = useRegisterLogic();
            logic.handleChangeRoute = handleChangeRoute;
            return logic;
        });

        act(() => {
            result.current.setFirstName('John');
            result.current.setLastName('Doe');
            result.current.setPassword('password123');
            result.current.setFullAddress('123 Main St');
            result.current.setTown('Townville');
            result.current.setPostal('12345');
            result.current.validatePesel('97122378901');
            result.current.validateEmail('john.doe@example.com');
            result.current.validateConfirmPassword('password123');
            result.current.validPostalCode('12-345');
        });

        await act(async () => {
            await result.current.handleRegister();
        });

        expect(mockNavigate).toHaveBeenCalledWith('Login');
    });

    it('should show error message when there is an unexpected error during registration', async () => {
        (checkInternetConnection as jest.MockedFunction<() => Promise<boolean>>).mockResolvedValue(true);

        const mockError = {
            response: {
                status: 500,
            },
        };
        (userRegister as jest.MockedFunction<typeof userRegister>).mockRejectedValue(mockError);

        const { result } = renderHook(() => useRegisterLogic());

        act(() => {
            result.current.setFirstName('John');
            result.current.setLastName('Doe');
            result.current.setPassword('password123');
            result.current.setFullAddress('123 Main St');
            result.current.setTown('Townville');
            result.current.setPostal('12345');
            result.current.validatePesel('97122378901');
            result.current.validateEmail('john.doe@example.com');
            result.current.validateConfirmPassword('password123');
            result.current.validPostalCode('12-345');
        });

        await act(async () => {
            await result.current.handleRegister();
        });

        expect(ToastAndroid.show).toHaveBeenCalledWith('Błąd podczas rejestracji. Spróbuj ponownie', ToastAndroid.SHORT);

        // Sprawdzamy, czy pola zostały wyczyszczone
        expect(result.current.firstName).toBe('');
        expect(result.current.lastName).toBe('');
        expect(result.current.pesel).toBe('');
        expect(result.current.email).toBe('');
        expect(result.current.password).toBe('');
        expect(result.current.confirmPassword).toBe('');
    });

    it('should show error message when PESEL or email already exists in the database', async () => {
        (checkInternetConnection as jest.MockedFunction<() => Promise<boolean>>).mockResolvedValue(true);

        const mockError = {
            response: {
                status: 400,
            },
        };
        (userRegister as jest.MockedFunction<typeof userRegister>).mockRejectedValue(mockError);

        const { result } = renderHook(() => useRegisterLogic());

        act(() => {
            result.current.setFirstName('John');
            result.current.setLastName('Doe');
            result.current.setPassword('password123');
            result.current.setFullAddress('123 Main St');
            result.current.setTown('Townville');
            result.current.setPostal('12345');
            result.current.validatePesel('97122378901');
            result.current.validateEmail('john.doe@example.com');
            result.current.validateConfirmPassword('password123');
            result.current.validPostalCode('12-345');
        });

        await act(async () => {
            await result.current.handleRegister();
        });

        expect(ToastAndroid.show).toHaveBeenCalledWith('Użytkownik dla podanego nr PESEL lub adresu email istnieje w bazie danych.', ToastAndroid.SHORT);

        expect(result.current.pesel).toBe('');
        expect(result.current.email).toBe('');
    });

    it('should show "Uzupełnij wszystkie pola" message when required fields are empty', async () => {
        (checkInternetConnection as jest.MockedFunction<() => Promise<boolean>>).mockResolvedValue(true);

        const { result } = renderHook(() => useRegisterLogic());

        act(() => {
            result.current.setFirstName('John');
            result.current.setLastName('Doe');
            result.current.validatePesel('97122378901');
            result.current.validateEmail('john.doe@example.com');
            result.current.setPassword('password123');
            result.current.validateConfirmPassword('password123');
        });

        await act(async () => {
            await result.current.handleRegister();
        });
        expect(ToastAndroid.show).toHaveBeenCalledWith('Uzupełnij wszystkie pola', ToastAndroid.SHORT);
    });

});

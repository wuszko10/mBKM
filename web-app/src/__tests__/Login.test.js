import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { act } from 'react';
import '@testing-library/jest-dom/extend-expect';
import Login from "../screens/Home/Login/Login";
import {toast} from "react-toastify";
import {BrowserRouter} from "react-router-dom";
import {useAuth} from "../context/authProvider";

jest.mock('axios');

jest.mock('../context/authProvider', () => ({
    useAuth: jest.fn(),
}));

const setup = () => {
    const utils = render(
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true}}>
            <Login />
        </BrowserRouter>
    )
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('submit-button');

    return {
        emailInput,
        passwordInput,
        submitButton,
        ...utils,
    }
}


describe('Login screen - integration test', () => {

    const mockToken = 'mock-token';
    const mockSetToken = 'mock-set-token';

    beforeEach(() => {
        useAuth.mockReturnValue({
            setToken: mockSetToken,
        });
        jest.clearAllMocks();
    });

    test('submits login form successfully', async () => {
        // Arrange

        const mockResponse = { data: { token: mockToken } };
        axios.post.mockResolvedValueOnce(mockResponse);

        const formData = { email: 'test@test.com', password: 'password123' };

        const {emailInput, passwordInput, submitButton} = setup();

        // Act
        fireEvent.change(emailInput, { target: { value: formData.email } });
        fireEvent.change(passwordInput, { target: { value: formData.password } });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        // Assert
        expect(emailInput.value).toBe(formData.email);
        expect(passwordInput.value).toBe(formData.password);
    });

    test('shows error toast on login failure', async () => {
        // Arrange
        const mockToastError = jest.spyOn(toast, 'error');
        const mockError = { response: { data: { error: 'Wrong password' } } };
        axios.post.mockRejectedValueOnce(mockError);

        const formData = { email: 'wrong@test.com', password: 'wrongpassword' };

        const {emailInput, passwordInput, submitButton} = setup();

        // Act

        fireEvent.change(emailInput, { target: { value: formData.email } });
        fireEvent.change(passwordInput, { target: { value: formData.password } });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        expect(mockToastError).toHaveBeenCalledWith('Błąd logowania', {
            position: 'top-right',
            theme: 'colored',
        });
    });
});

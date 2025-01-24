import {MemoryRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import React from "react";
import AppRoutes from "../AppRoutes";
import {useAuth} from "../context/authProvider";

jest.mock('../context/authProvider', () => ({
    useAuth: jest.fn(),
}));

describe('Route path redirection - integration test', () => {

    beforeEach(() => {

        jest.clearAllMocks();
    });

    it('should display Login component for invalid routes - not logged in user', async () => {
        const mockToken = '';
        useAuth.mockReturnValue({
            token: mockToken,
        });

        render(
            <MemoryRouter initialEntries={['/invalid-route']} initialIndex={0} future={{ v7_startTransition: true, v7_relativeSplatPath: true}}>
                <AppRoutes />
            </MemoryRouter>

        );

        expect(screen.getByTestId('signup-view')).toBeInTheDocument();
    });

    it('should redirect to home page if authenticated user tries to access an undefined path', async () => {

        const mockToken = 'mock-token';
        useAuth.mockReturnValue({
            token: mockToken,
        });

        render(
            <MemoryRouter initialEntries={['/ticketss']} initialIndex={0} future={{ v7_startTransition: true, v7_relativeSplatPath: true}}>
                <AppRoutes />
            </MemoryRouter>
        );

        expect(screen.getByTestId('not-found-text')).toBeInTheDocument();
    });

});

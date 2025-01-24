import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import Header from "../components/Header/Header";
import {createMemoryHistory} from "history";
import {useAuth} from "../context/authProvider";


jest.mock('../context/authProvider', () => ({
    useAuth: jest.fn(),
}));

const setup = () => {
    const utils = render(
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true}}>
            <Header />
        </BrowserRouter>
    )
    const navHome = screen.getByTestId('nav-home');
    const navTickets = screen.getByTestId('nav-tickets');
    const navStops = screen.getByTestId('nav-stops');
    const navLines = screen.getByTestId('nav-lines');
    const navTransactions = screen.getByTestId('nav-transactions');
    const navUsers = screen.getByTestId('nav-users');
    const logoutButton = screen.getByTestId('logout-btn');

    return {
        navHome,
        navTickets,
        navStops,
        navLines,
        navTransactions,
        navUsers,
        logoutButton,
        ...utils,
    }
}

describe('Header navigation menu - integration test', () => {

    const mockSetToken = 'mock-set-token';

    beforeEach(() => {
        useAuth.mockReturnValue({
            setToken: mockSetToken,
        });
        jest.clearAllMocks();
    });

    it('navigate to home page when Home link is clicked', async () => {

        const history = createMemoryHistory();

        const {navHome} = setup();

        fireEvent.click(navHome);

        await waitFor(() => {
            expect(history.location.pathname).toBe('/');
        });
        expect(navHome).toHaveStyle("color: rgb(0, 43, 68); backgroundColor: white");
    });

    it('navigate to tickets page when Home link is clicked', async () => {

        const history = createMemoryHistory();

        const {navTickets} = setup();

        fireEvent.click(navTickets);

        await waitFor(() => {
            expect(history.location.pathname).toBe('/');
        });
        expect(navTickets).toHaveStyle("color: rgb(0, 43, 68); backgroundColor: white");
    });

    it('navigate to stops page when Home link is clicked', async () => {

        const history = createMemoryHistory();

        const {navStops} = setup();

        fireEvent.click(navStops);

        await waitFor(() => {
            expect(history.location.pathname).toBe('/');
        });
        expect(navStops).toHaveStyle("color: rgb(0, 43, 68); backgroundColor: white");
    });

    it('navigate to lines page when Home link is clicked', async () => {

        const history = createMemoryHistory();

        const {navLines} = setup();

        fireEvent.click(navLines);

        await waitFor(() => {
            expect(history.location.pathname).toBe('/');
        });
        expect(navLines).toHaveStyle("color: rgb(0, 43, 68); backgroundColor: white");
    });

    it('navigate to transactions page when Home link is clicked', async () => {

        const history = createMemoryHistory();

        const {navTransactions} = setup();

        fireEvent.click(navTransactions);

        await waitFor(() => {
            expect(history.location.pathname).toBe('/');
        });
        expect(navTransactions).toHaveStyle("color: rgb(0, 43, 68); backgroundColor: white");
    });

    it('navigate to users page when Home link is clicked', async () => {

        const history = createMemoryHistory();

        const {navUsers} = setup();

        fireEvent.click(navUsers);

        await waitFor(() => {
            expect(history.location.pathname).toBe('/');
        });
        expect(navUsers).toHaveStyle("color: rgb(0, 43, 68); backgroundColor: white");
    });

    it('navigate to home page when Home link is clicked', async () => {

        const history = createMemoryHistory();

        const {navHome} = setup();

        fireEvent.click(navHome);

        await waitFor(() => {
            expect(history.location.pathname).toBe('/');
        });
        expect(navHome).toHaveStyle("color: rgb(0, 43, 68); backgroundColor: white");
    });

    it('navigate to home page when Home link is clicked', async () => {

        const history = createMemoryHistory();

        const {logoutButton} = setup();

        fireEvent.click(logoutButton);

        expect(localStorage.getItem('token')).toBe(null);
        await waitFor(() => {
            expect(history.location.pathname).toBe('/');
        });

    });

});

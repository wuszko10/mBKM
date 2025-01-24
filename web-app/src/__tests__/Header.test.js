import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from "../components/Header/Header";
import {useAuth} from "../context/authProvider";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('../context/authProvider', () => ({
    useAuth: jest.fn(),
}));

describe('Rendering Header component - unit test', () => {
    const mockNavigate = jest.fn();
    const mockLogout = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useAuth.mockReturnValue({ logout: mockLogout });
        require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    });

    beforeEach(() => {
        jest.clearAllMocks();
        require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    });

    it('should render the header with logo and navigation links', () => {
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true}}>
                <Header />
            </MemoryRouter>
        );

        expect(screen.getByText('mBKM')).toBeInTheDocument();
        expect(screen.getByTestId('logo')).toBeInTheDocument();

        const links = screen.getAllByRole('link');
        expect(links.length).toBe(7);
        expect(links[0].textContent).toBe('mBKMAdmin');
        expect(links[1].textContent).toBe('Start');
        expect(links[2].textContent).toBe('Bilety');
        expect(links[3].textContent).toBe('Przystanki');
        expect(links[4].textContent).toBe('Linie');
        expect(links[5].textContent).toBe('Transakcje');
        expect(links[6].textContent).toBe('Użytkownicy');
    });

});

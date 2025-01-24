import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DynamicTable from "../components/GlobalTable/DynamicTable";
import {getTopUpTransactionColumns} from "../utils/TableColumns";

describe('DynamicTable without filter - integration test', () => {
    const data = [
        { id: 1, number: '001', userEmail: 'user1@example.com', amount: 50, paymentDate: '2024-12-16', method: 'Credit Card' },
        { id: 2, number: '002', userEmail: 'user2@example.com', amount: 100, paymentDate: '2024-12-15', method: 'PayPal' },
        { id: 3, number: '003', userEmail: 'user3@example.com', amount: 75, paymentDate: '2024-12-14', method: 'Bank Transfer' },
    ];

    it('renders table with data', () => {
        render(
            <DynamicTable
                data={data}
                columns={getTopUpTransactionColumns()}
                onFilterChange={() => {}}
                pageIndex={0}
                pageSize={5}
                totalPages={1}
                onPageChange={() => {}}
                onPageSizeChange={() => {}}
                loading={false}
            />
        );

        // Check if table headers are rendered
        expect(screen.getByText('Lp.')).toBeInTheDocument();
        expect(screen.getByText('Numer transakcji')).toBeInTheDocument();
        expect(screen.getByText('Użytkownik')).toBeInTheDocument();
        expect(screen.getByText('Kwota [zł]')).toBeInTheDocument();
        expect(screen.getByText('Data doładowania')).toBeInTheDocument();
        expect(screen.getByText('Metoda')).toBeInTheDocument();

        // Check if data rows are rendered
        expect(screen.getByText('001')).toBeInTheDocument();
        expect(screen.getByText('user1@example.com')).toBeInTheDocument();
        expect(screen.getByText('50.00 zł')).toBeInTheDocument();
        expect(screen.getByText('16.12.2024, 01:00:00')).toBeInTheDocument();
        expect(screen.getByText('Credit Card')).toBeInTheDocument();
    });

    it('paginates data correctly', () => {
        const onPageChange = jest.fn();
        render(
            <DynamicTable
                data={data}
                columns={getTopUpTransactionColumns()}
                onFilterChange={() => {}}
                pageIndex={0}
                pageSize={5}
                totalPages={2}
                onPageChange={onPageChange}
                onPageSizeChange={() => {}}
                loading={false}
            />
        );

        // Simulate next page button click
        fireEvent.click(screen.getByText('Następna'));

        expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it('changes page size correctly', () => {
        const onPageSizeChange = jest.fn();
        render(
            <DynamicTable
                data={data}
                columns={getTopUpTransactionColumns()}
                onFilterChange={() => {}}
                pageIndex={0}
                pageSize={5}
                totalPages={1}
                onPageChange={() => {}}
                onPageSizeChange={onPageSizeChange}
                loading={false}
            />
        );

        // Simulate page size change
        fireEvent.change(screen.getByRole('combobox'), { target: { value: '10' } });

        expect(onPageSizeChange).toHaveBeenCalledWith(10);
    });

    it('displays loading state correctly', () => {
        render(
            <DynamicTable
                data={data}
                columns={getTopUpTransactionColumns()}
                onFilterChange={() => {}}
                pageIndex={0}
                pageSize={5}
                totalPages={1}
                onPageChange={() => {}}
                onPageSizeChange={() => {}}
                loading={true}
            />
        );

        expect(screen.getByText('Ładowanie...')).toBeInTheDocument();
    });
});

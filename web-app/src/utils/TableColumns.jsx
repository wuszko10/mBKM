import React from "react";
import {RiEdit2Fill, RiEdit2Line} from "react-icons/ri";
import Button from "../components/Button/button";
import {MdCancel, MdOutlineCancel} from "react-icons/md";
import {TbCopyPlus, TbCopyPlusFilled, TbTrash, TbTrashFilled} from "react-icons/tb";
import {FaExternalLinkSquareAlt} from "react-icons/fa";
import {FiExternalLink} from "react-icons/fi";
import ToggleSwitch from "../components/ToggleSwitch/toggleSwitch";

export const getTicketsTableColumns = (navigate) => [
    {
        accessorKey: 'id',
        header: 'Lp.',
        cell: (info) => info.row.index + 1,
    },
    {
        accessorKey: 'typeLabel',
        header: 'Typ biletu',
    },
    {
        accessorKey: 'periodLabel',
        header: 'Ważność',
    },
    {
        accessorKey: 'lineLabel',
        header: 'Ilość linii',
    },
    {
        header: ' ',
        cell: ({ row }) => (
            <div className="row-div">
                <Button
                    handleFunction={navigate}
                    argument={`/ticket/${row.original.typeLabel}/${row.original.periodLabel}/${row.original.lineLabel}`}
                    defaultIcon={<FaExternalLinkSquareAlt  className={'defaultTableIcon'} />}
                    hoverIcon={<FiExternalLink className={'hoverTableIcon'} />}
                    title={'Szczegóły biletu'}
                />
            </div>
        ),
    },
];

export const getTicketsDetailsTableColumns = (handleEdit, handleRemove, handleDuplicate, handleCancel) => [
    {
        accessorKey: 'id',
        header: 'Lp.',
        cell: (info) => info.row.index + 1,
    },
    {
        accessorKey: 'offerStartDate',
        header: 'Data rozpoczęcia oferty',
        cell: (info) => {
            const dateValue = info.getValue();
            return dateValue ? new Date(dateValue).toLocaleString() : 'Brak';
        },
    },
    {
        accessorKey: 'offerEndDate',
        header: 'Data zakończenia oferty',
        cell: (info) => {
            const dateValue = info.getValue();
            return dateValue ? new Date(dateValue).toLocaleString() : 'Brak';
        },
    },
    {
        accessorKey: 'price',
        header: 'Cena [zł]',
        cell: (info) => (info.getValue().toFixed(2) + " zł"),
    },
    {
        header: ' ',
        cell: ({ row }) => {
            const currentDate = new Date(Date.now());
            currentDate.setHours(23,59,59,999);

            return (<div className="row-div">
                {row.original.offerStartDate >= currentDate.toISOString()

                    && (<div className="row-div">
                        <Button
                            handleFunction={handleEdit}
                            argument={row.original._id}
                            defaultIcon={<RiEdit2Line className={'defaultTableIcon'} />}
                            hoverIcon={<RiEdit2Fill className={'hoverTableIcon'} />}
                            title={'Edytuj ofertę'}
                        />
                        <Button
                            handleFunction={handleRemove}
                            argument={row.original._id}
                            defaultIcon={<TbTrash className={'defaultTableIcon'} />}
                            hoverIcon={<TbTrashFilled className={'hoverTableIcon'} />}
                            title={'Usuń ofertę'}
                        />
                    </div>)}

                {row.original.offerStartDate < currentDate.toISOString() &&
                    (<div className="row-div">
                        <Button
                            handleFunction={handleCancel}
                            argument={row.original._id}
                            defaultIcon={<RiEdit2Line className={'defaultTableIcon'}/>}
                            hoverIcon={<RiEdit2Fill className={'hoverTableIcon'}/>}
                            title={'Edytuj datę zakończenia oferty'}
                        />
                        {!row.original.offerEndDate && (
                                <Button
                                    handleFunction={handleCancel}
                                    argument={row.original._id}
                                    defaultIcon={<MdOutlineCancel className={'defaultTableIcon'}/>}
                                    hoverIcon={<MdCancel className={'hoverTableIcon'}/>}
                                    title={'Zakończ ofertę'}
                                />)}

                        { (row.original.offerEndDate && row.original.isLast) &&(
                            <Button
                                handleFunction={handleDuplicate}
                                argument={row.original._id}
                                defaultIcon={<TbCopyPlus className={'defaultTableIcon'}/>}
                                hoverIcon={<TbCopyPlusFilled className={'hoverTableIcon'}/>}
                                title={'Skopiuj, aby ustalić nową cenę'}
                            />
                        )}

                    </div>)
                }
            </div>)
        },
    },
];

export const getReliefColumns = (handleEdit, handleRemove, handleToggle) => [
    {
        accessorKey: 'id',
        header: 'Lp.',
        cell: (info) => info.row.index + 1,
    },
    {
        accessorKey: 'name',
        header: 'Nazwa ulgi',
    },
    {
        accessorKey: 'percentage',
        header: 'Odpłatność [%]',
        cell: (info) => (info.getValue() + " %"),
    },
    {
        accessorKey: 'typeLabel',
        header: 'Typ ulgi',
    },
    {
        accessorKey: 'ticketTypeLabel',
        header: 'Typ biletu',
    },
    {
        accessorKey: 'isActive',
        header: 'Aktywny',
        cell: ({ row }) => (
            <ToggleSwitch
                isActive={row.original.isActive}
                onToggle={handleToggle}
                argument={row.original._id}
            />
        )
    },
    {
        header: ' ',
        cell: ({ row }) => (
            <div className="row-div">
                <Button
                    handleFunction={handleEdit}
                    argument={row.original._id}
                    defaultIcon={<RiEdit2Line className={'defaultTableIcon'} />}
                    hoverIcon={<RiEdit2Fill className={'hoverTableIcon'} />}
                    title={'Edytuj dane ulgi'}
                />
                <Button
                    handleFunction={handleRemove}
                    argument={row.original._id}
                    defaultIcon={<TbTrash className={'defaultTableIcon'} />}
                    hoverIcon={<TbTrashFilled className={'hoverTableIcon'} />}
                    title={'Usuń ulgę'}
                />
            </div>
        ),
    },
];

export const getStopsColumns = (handleEdit, handleRemove, handleToggle) => [
    {
        accessorKey: 'id',
        header: 'Lp.',
        cell: (info) => info.row.index + 1,
    },
    {
        accessorKey: 'name',
        header: 'Nazwa przystanku',
    },
    {
        accessorKey: 'latitude',
        header: 'Szerokość geograficzna',
    },
    {
        accessorKey: 'longitude',
        header: 'Długość geograficzna',
    },
    {
        accessorKey: 'isActive',
        header: 'Aktywny',
        cell: ({ row }) => (
            <ToggleSwitch
                isActive={row.original.isActive}
                onToggle={handleToggle}
                argument={row.original._id}
            />
        )
    },
    {
        header: ' ',
        cell: ({ row }) => (
            <div className="row-div">
                <Button
                    handleFunction={handleEdit}
                    argument={row.original._id}
                    defaultIcon={<RiEdit2Line className={'defaultTableIcon'} />}
                    hoverIcon={<RiEdit2Fill className={'hoverTableIcon'} />}
                    title={'Edytuj dane przystanku'}
                />
                <Button
                    handleFunction={handleRemove}
                    argument={row.original._id}
                    defaultIcon={<TbTrash className={'defaultTableIcon'} />}
                    hoverIcon={<TbTrashFilled className={'hoverTableIcon'} />}
                    title={'Usuń przystanek'}
                />
            </div>
        ),
    },
];

export const getUsersColumns = (navigate, handleToggle) => [
    {
        accessorKey: 'id',
        header: 'Lp.',
        cell: (info) => info.row.index + 1,
    },
    {
        accessorKey: 'firstName',
        header: 'Imię',
    },
    {
        accessorKey: 'lastName',
        header: 'Nazwisko',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'active',
        header: 'Aktywny',
        cell: ({ row }) => (
            <ToggleSwitch
                isActive={row.original.active}
                onToggle={handleToggle}
                argument={row.original._id}
            />
        )
    },
    {
        header: ' ',
        cell: ({ row }) => (
            <div className="row-div">
                <Button
                    handleFunction={navigate}
                    argument={`/user/${row.original._id}`}
                    defaultIcon={<FaExternalLinkSquareAlt  className={'defaultTableIcon'} />}
                    hoverIcon={<FiExternalLink className={'hoverTableIcon'} />}
                    title={'Szczegóły użytkownika'}
                />
            </div>
        ),
    },
];

export const getTransactionColumns = (navigate) => [
    {
        accessorKey: 'id',
        header: 'Lp.',
        cell: (info) => info.row.index + 1,
    },
    {
        accessorKey: 'number',
        header: 'Numer transakcji',
        cell: ({row} ) => {
            return <button onClick={() => navigate(`/transaction/${row.original._id}`)}>{row.original.number}</button>
        }
    },
    {
        accessorKey: 'userEmail',
        header: 'Użytkownik',
        cell: ({row} ) => {
            return <button onClick={() => navigate(`/user/${row.original.userId}`)}>{row.original.userEmail}</button>
        }
    },
    {
        accessorKey: 'finalPrice',
        header: 'Kwota [zł]',
        cell: (info) => (info.getValue().toFixed(2) + " zł"),
    },
    {
        accessorKey: 'paymentDate',
        header: 'Data zakupu',
        cell: (info) => new Date(info.getValue()).toLocaleString(),
    },
    {
        accessorKey: 'ticketNumber',
        header: 'Numer biletu',
    },
    {
        header: ' ',
        cell: ({ row }) => (
            <div className="row-div">
                <Button
                    handleFunction={navigate}
                    argument={`/transaction/${row.original._id}`}
                    defaultIcon={<FaExternalLinkSquareAlt  className={'defaultTableIcon'} />}
                    hoverIcon={<FiExternalLink className={'hoverTableIcon'} />}
                    title={'Szczegóły transakcji'}
                />
            </div>
        ),
    },
];

export const getTopUpTransactionColumns = (navigate) => [
    {
        accessorKey: 'id',
        header: 'Lp.',
        cell: (info) => info.row.index + 1,
    },
    {
        accessorKey: 'number',
        header: 'Numer transakcji',
    },
    {
        accessorKey: 'userEmail',
        header: 'Użytkownik',
        cell: ({row} ) => {
            return <button onClick={() => navigate(`/user/${row.original.userId}`)}>{row.original.userEmail}</button>
        }
    },
    {
        accessorKey: 'amount',
        header: 'Kwota [zł]',
        cell: (info) => (info.getValue().toFixed(2) + " zł"),
    },
    {
        accessorKey: 'method',
        header: 'Metoda',
    },
    {
        accessorKey: 'referenceId',
        header: 'Numer płatności',
    },
    {
        accessorKey: 'paymentDate',
        header: 'Data doładowania',
        cell: (info) => new Date(info.getValue()).toLocaleString(),
    }
];

export const getLinesColumns = (handleEdit, handleRemove, handleToggle) => [
    {
        accessorKey: 'id',
        header: 'Lp.',
        cell: (info) => info.row.index + 1,
    },
    {
        accessorKey: 'number',
        header: 'Numer linii',
    },
    {
        accessorKey: 'name',
        header: 'Nazwa linii',
    },
    {
        accessorKey: 'isActive',
        header: 'Aktywna',
        cell: ({ row }) => (
            <ToggleSwitch
                isActive={row.original.isActive}
                onToggle={handleToggle}
                argument={row.original._id}
            />
        )
    },
    {
        header: ' ',
        cell: ({ row }) => (
            <div className="row-div">
                <Button
                    handleFunction={handleEdit}
                    argument={row.original._id}
                    defaultIcon={<RiEdit2Line className={'defaultTableIcon'} />}
                    hoverIcon={<RiEdit2Fill className={'hoverTableIcon'} />}
                    title={'Edytuj dane linii'}
                />
                <Button
                    handleFunction={handleRemove}
                    argument={row.original._id}
                    defaultIcon={<TbTrash className={'defaultTableIcon'} />}
                    hoverIcon={<TbTrashFilled className={'hoverTableIcon'} />}
                    title={'Usuń linię'}
                />
            </div>
        ),
    },
];

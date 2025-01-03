import React from 'react';
import { useParams } from 'react-router-dom';
import {useUserDetails} from "../../../hooks/Users/useUserDetails";
import Loading from "../../../components/Loading/Loading";
import './style.scss';
import {FaUserLarge} from "react-icons/fa6";
import {getBirthDateFromPesel} from "../../../utils/Users/getBirthDate";
import {LuWallet} from "react-icons/lu";
import {RiExchangeDollarLine} from "react-icons/ri";
import {TbShoppingCartDollar} from "react-icons/tb";
import {MdSyncLock} from "react-icons/md";

const UserDetails = () => {
    const { id } = useParams();

    const {
        loading,
        userDetails,
        wallet,
        userTickets,
        transactions,
        topUps,
        sessions,
        changeStatus,
    } = useUserDetails(id);

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="main-box">
            <div className="content-box">
                <h2>Szczegóły użytkownika</h2>
                    <div className={"user-container"}>

                            <div className={"first-row"}>
                                <div className={"user-details-box"}>
                                    <div className={"user-box"}>
                                        <FaUserLarge size={50}/>
                                        <div className={"name-box"}>
                                            <p><strong>{userDetails?.firstName}</strong></p>
                                            <p><strong>{userDetails?.lastName}</strong></p>
                                        </div>
                                    </div>

                                    <div className={"ud-details-box"}>
                                        <p>Numer identyfikacyjny: <strong>{userDetails?.id}</strong></p>
                                        <p>Adres e-mail: <strong>{userDetails?.email}</strong></p>
                                        <p>Data urodzenia: <strong>{userDetails?.pesel ? getBirthDateFromPesel(userDetails.pesel).toLocaleDateString() : 'Brak daty urodzenia'}</strong></p>
                                        <p>NumerPESEL: <strong>{userDetails?.pesel ? (userDetails.pesel.slice(0, -5) + '*****') : 'Brak nr PESEL'}</strong></p>
                                        <p>Data rejestracji: <strong>{userDetails?.registrationDate ? new Date(userDetails.registrationDate).toLocaleString() : '---'}</strong></p>
                                        <p>Adres zamieszkania: <strong>{userDetails?.address ? userDetails.address : 'Brak adresu'}</strong></p>
                                        <p>Status: <strong>{userDetails?.active ? "Aktywny" : 'Nieaktywny'}</strong></p>
                                        <p>Rola: <strong>{userDetails?.role}</strong></p>
                                    </div>

                                </div>
                                <div className="divider" />
                                <div className={'user-option-container'}>
                                    <h3>Czy chcesz {userDetails?.active ? 'dezaktywować' : 'aktywować'} użytkownika?</h3>
                                    <p>{ userDetails?.active ? 'Dezaktywacja uniemożliwia logowanie się do systemu - użytkownik zostaje "usunięty"' : 'Aktywacja umożliwia przywrócenie użytkownikowi dostępu do konta, wraz historią'}</p>
                                    <button onClick={changeStatus}>{userDetails?.active ? 'Dezaktywuj' : 'Aktywuj'}</button>
                                </div>
                            </div>

                        <div className="horizontal-divider" />
                        <div className={"stats-container"}>

                            <h3>Statystyki</h3>

                            <div className={"row-stats-box"}>
                                <div className={"info-box"}>
                                    <LuWallet size={30} />
                                    <p>Stan konta: <strong>{wallet?.amount ? (wallet?.amount.toFixed(2) + " zł") : '0.00 zł'}</strong></p>
                                </div>
                                <div className={"info-box"}>
                                    <TbShoppingCartDollar size={30} />
                                    <p>Liczba transakcji: <strong>{transactions ? transactions : '0'}</strong></p>
                                </div>

                                <div className={"info-box"}>
                                    <RiExchangeDollarLine size={30} />
                                    <p>Liczba doładowań systemu: <strong>{topUps ? topUps : '0'}</strong></p>
                                </div>

                                <div className={"info-box"}>
                                    <MdSyncLock size={30} />
                                    <p>Liczba aktywnych sesji: <strong>{sessions ? sessions : '0'}</strong></p>
                                </div>
                            </div>

                        </div>
                    </div>


            </div>
        </div>
    );
};

export default UserDetails;

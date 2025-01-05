import React from 'react';
import '../../../styles/style.scss'
import './style.scss'
import Loading from "../../../components/Loading/Loading";
import {useHome} from "../../../hooks/Home/useHome";
import DataChart from "../../../components/Chart/dataChart";
import {TbShoppingCartDollar} from "react-icons/tb";
import {MdSyncLock} from "react-icons/md";
import {Link} from "react-router-dom";
import {RiExchangeDollarLine} from "react-icons/ri";

const Main = () => {

    const {
        loading,
        days,
        transactions,
        userTickets,
        usersTotalAmount,
        activeUsers,
        totalAmount,
        setDays
    } = useHome();

    if (loading) {
        return (
            <Loading/>
        )
    }

    return (
        <div className="main-box">
            <div className="content-box">
                <div className={"section-box"}>
                    <div className="header-with-button">
                            <h2>Statystyki</h2>
                        <div>
                            <p>Wybierz okres:</p>
                            <select name="select-size" value={days} onChange={(e) => setDays(Number(e.target.value))}>
                                <option value={15}>15</option>
                                <option value={30}>30</option>
                                <option value={45}>45</option>
                            </select>

                        </div>

                    </div>
                    <div className={"chart-container"}>
                        <DataChart transactions={transactions} days={days} title={'dokonanych transakcji'}/>
                        <div className={'lastTickets-box'}>
                            <h3>Ostatnio zakupione bilety</h3>
                            <ol>
                                {userTickets?.slice(0,10).map((item, index) => (
                                    <li key={index}>
                                        <a href={`/transaction/${item.transactionId}`}>Bilet <strong>{item.number}</strong> zakupiony <strong>{item.purchaseDate.toLocaleString()}</strong></a>
                                    </li>
                                ))}
                            </ol>
                            <Link to={'/transactions'}>Więcej</Link>
                        </div>
                    </div>
                    <div className={"home-row-stats-box"}>
                        <div className={"home-info-box"}>
                            <TbShoppingCartDollar size={30} />
                            <p>Suma zgromadzonych środków na kontach użytkowników: <strong>{Number(usersTotalAmount).toFixed(2)} zł</strong></p>
                        </div>

                        <div className={"home-info-box"}>
                            <RiExchangeDollarLine size={30} />
                            <p>Suma wniesionych opłat za sprzedane bilety: <strong>{ Number(totalAmount).toFixed(2)} zł</strong></p>
                        </div>

                        <div className={"home-info-box"}>
                            <MdSyncLock size={30} />
                            <p>Liczba aktywnych sesji użytkowników: <strong>{activeUsers.toString()}</strong></p>
                        </div>
                    </div>
                    <div className={"horizontal-div"}>
                        <p>Dane z ostatnich {days} dni</p>
                        <div className={"horizontal-divider"} />
                    </div>

                </div>

                <div className={"section-box"}>

                    <div className={"home-row-stats-box"}>
                        <div className={"link-box"}>
                            <h3>Użytkownicy</h3>
                            <Link to={'/users'}>Użytkownicy</Link>
                            <Link to={'/transactions'}>Transakcje</Link>
                            <Link to={'/top-ups'}>Doładowania kont</Link>
                        </div>
                        <div className={"link-box"}>
                            <h3>Taryfa</h3>
                            <Link to={'/tickets'}>Bilety</Link>
                            <Link to={'/reliefs'}>Ulgi</Link>
                        </div>
                        <div className={"link-box"}>
                            <h3>System</h3>
                            <Link to={'/stops'}>Przystanki</Link>
                            <Link to={'/lines'}>Linie</Link>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Main;

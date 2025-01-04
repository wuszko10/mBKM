import React from 'react';
import '../../../styles/style.scss'
import './style.scss'
import Loading from "../../../components/Loading/Loading";
import {useHome} from "../../../hooks/Home/useHome";
import DataChart from "../../../components/Chart/dataChart";

const Main = () => {

    const {
        loading,
        days,
        transactions,
        userTickets,
        usersTotalAmount,
        activeUsers,
        setDays,
    } = useHome();

    if (loading) {
        return (
            <Loading />
        )
    }

    //
    // console.log(transactions);
    // console.log(userTickets);
    // console.log(usersTotalAmount);
    // console.log(activeUsers);

    return (
        <div className="main-box">
            <div className="content-box">
                <div className={"chart-container"}>
                    <DataChart transactions={transactions} days={days} title={'transakcji'}/>
                    <DataChart transactions={userTickets} days={days} title={'biletów'}/>
                </div>


            </div>
        </div>
    );
};

export default Main;

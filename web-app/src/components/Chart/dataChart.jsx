import React, {useCallback, useEffect, useState} from "react";
import Loading from "../Loading/Loading";
import { Line } from 'react-chartjs-2';
import './style.scss'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import {countTransactionsByDay} from "../../utils/Home/chartData";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const DataChart = ({transactions, days, title}) => {

    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState(null);
    const [yMax, setYMay] = useState(6);

    const fetchData = useCallback(()=>{

        const completeData = transactions ? countTransactionsByDay(transactions, days) : [];

        const labels = completeData.map((t) => t.date);
        const data = completeData.map((t) => t.transactionCount);

        const maxValue = Math.max(...data);
        setYMay ((maxValue <= 5) ? 6 : Math.ceil(maxValue + 2));

        setChartData({
            labels,
            datasets: [
                {
                    label: `Liczba ${title}` ,
                    data,
                    borderColor: "rgba(0, 43, 68, 1)",
                    backgroundColor: "rgba(0, 43, 68, 1)",
                    borderWidth: 1,
                },
            ],
        });

        setLoading(false);
    },[transactions, days, title])

    useEffect(() => {
       fetchData();
    }, [fetchData])

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className={"chart-box"}>
            <h3>Wykres {title} z ostatnich {days} dni</h3>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { display: true },
                    },
                    scales: {
                        x: {
                            title: { display: true, text: `Data ${title}` },
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: Number(days*0.2).toFixed(0),
                            }
                        },
                        y: {
                            title: { display: true, text: `Liczba ${title}` },
                            min: 0,
                            max: yMax,
                            ticks: {
                                stepSize: 1,
                            },
                        },
                    },
                }}
            />
        </div>
    )
}

export default DataChart;

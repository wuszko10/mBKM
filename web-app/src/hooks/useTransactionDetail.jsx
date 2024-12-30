import {useEffect, useState} from "react";
import {useAuth} from "../context/authProvider";
import {getTransaction} from "../services/trasanction.service";

export const useTransactionDetail = (id) => {
    const [userTicket, setUserTicket] = useState();
    const [transaction, setTransaction] = useState();
    const [ticket, setTicket] = useState();
    const [relief, setRelief] = useState();
    const [user, setUser] = useState();
    const [metadata, setMetadata] = useState({
        ticketType: '',
        lines: '',
        period: '',
        reliefType: '',
        status: '',
        method: '',
    })
    const [loading, setLoading] = useState(true);
    const {token} = useAuth();

    useEffect(() => {

        getTransaction(id, token)
            .then((data) => {
                setTransaction(data.transaction);
                setUserTicket(data.userTicket);
                setTicket(data.ticket);
                setRelief(data.relief);
                setUser(data.user);
            })
            .catch((error) => {
                console.error("Failed to fetch ticket", error);
            }).finally(() => {
            setLoading(false);
        });

    }, [id]);

    useEffect(() => {

        const metadataTypes = localStorage.getItem("metadata");

        console.log(transaction);

        if (metadataTypes) {

            const parseMetadata = JSON.parse(metadataTypes);

            console.log("fff " + parseMetadata);

            const ticketType = parseMetadata.ticketTypes.find(tt => tt.id === ticket?.type.toString());
            const lines = parseMetadata.ticketLines.find(tl => tl.id === ticket?.lines.toString());
            const period = parseMetadata.ticketPeriods.find(tp => tp.id === ticket?.period.toString());
            const reliefType = parseMetadata.reliefTypes.find(r => r.id === userTicket?.reliefId.toString());
            const status = parseMetadata.statusTypes.find(s => s.id === userTicket?.statusId.toString());
            const method = parseMetadata.paymentMethods.find(m => m.id === transaction?.methodId.toString());

            setMetadata({
                ticketType: ticketType?.label,
                lines: lines?.label,
                period: period?.label,
                reliefType: reliefType?.id,
                status: status?.label,
                method: method?.label,
            })
        }

    }, [userTicket, transaction])

    return {
        loading,
        transaction,
        userTicket,
        relief,
        metadata,
        user
    };
};

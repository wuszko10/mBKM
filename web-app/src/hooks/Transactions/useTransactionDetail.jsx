import {useEffect, useState} from "react";
import {useAuth} from "../../context/authProvider";
import {getTransaction} from "../../services/Transactions/trasanction.service";
import {toast} from "react-toastify";

export const useTransactionDetail = (id) => {
    const [userTicket, setUserTicket] = useState();
    const [transaction, setTransaction] = useState();
    const [ticket, setTicket] = useState();
    const [relief, setRelief] = useState();
    const [line, setLine] = useState();
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
                setLine(data.line);
                setUser(data.user);
            })
            .catch(() => {
                toast.warn('Błąd odświeżania danych', {
                    position: 'top-right',
                    theme: "colored",
                });
            }).finally(() => {
            setLoading(false);
        });

    }, [id, token]);

    useEffect(() => {

        const metadataTypes = localStorage.getItem("metadata");

        if (metadataTypes) {

            const parseMetadata = JSON.parse(metadataTypes);

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

    }, [userTicket, transaction, ticket])

    return {
        loading,
        transaction,
        userTicket,
        relief,
        line,
        metadata,
        user
    };
};

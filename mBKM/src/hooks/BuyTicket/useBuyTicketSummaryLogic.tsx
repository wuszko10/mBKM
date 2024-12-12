import { useEffect,useState } from "react";
import { Line,PaymentMethod,Ticket } from "../../types/interfaces.tsx";
import { storage } from "../../../App.tsx";
import { paymentMethods } from "../../repositories/Data.tsx";

export const useBuyTicketSummaryLogic = (selectedTicket: Ticket, selectedLines: string | null ) => {

    const [isLoading, setIsLoading] = useState(true);
    const [paymentMethodId, setPaymentMethodId] = useState(0);
    const [line, setLine] = useState<Line>();


    const getData = () => {
        if(!isLoading) return;

        const linesStr = storage.getString('lines');
        console.log(linesStr);

        if (linesStr)
        {
            const parseLines: Line[] = JSON.parse(linesStr);
            console.log("tutaj");
            const filteredLine = parseLines.find(l => l.id == selectedLines)
            console.log(filteredLine);
            setLine(filteredLine);
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        getData();
    }, [isLoading])

    const filteredMethods: PaymentMethod[] = paymentMethods
        .filter(method => {
            return selectedTicket.type === "jednorazowy" ? method.label === "Portfel" :  method.label !== "Portfel";
        });

    return {
        line,
        paymentMethodId,
        filteredMethods,
        isLoading,
        setPaymentMethodId,
    }
}

import authToken from "../middleware/authToken";
import business from "../business/business.container";
import applicationException from "../service/applicationException";

const PaymentEndpoint = (router) => {



    router.post('/api/pay/wallet', authToken, async (req, res) => {
        const { amount, transactionId } = req.body;
        try {
            const tickets = await business.getPaymentManager().walletPayment(amount, transactionId);
            res.status(200).json(tickets);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    })

    router.post('/api/pay/card', authToken, async (req, res) => {
        console.log("Body content:", req.body);
        const { amount, transactionId, cardNumber, expiryDate, cvv, userTicketId } = req.body;
        try {
            const payment = await business.getPaymentManager().cardPaymentTransaction(amount, transactionId, cardNumber, expiryDate, cvv, userTicketId);
            res.status(200).json(payment);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    })

    router.post('/api/pay/blik', authToken, async (req, res) => {
        const { amount, transactionId, code, userTicketId } = req.body;
        try {
            const tickets = await business.getPaymentManager().blikPaymentTransaction(amount, transactionId, code, userTicketId);
            res.status(200).json(tickets);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    })

    router.post('/api/top-up/card', authToken, async (req, res) => {
        const { amount, transactionId, cardNumber, expiryDate, cvv } = req.body;
        try {
            const tickets = await business.getPaymentManager().cardPaymentTopUp(amount, transactionId, cardNumber, expiryDate, cvv);
            res.status(200).json(tickets);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    })

    router.post('/api/top-up/blik', authToken, async (req, res) => {
        const { amount, transactionId, code } = req.body;
        try {
            const tickets = await business.getPaymentManager().blikPaymentTopUp(amount, transactionId, code);
            res.status(200).json(tickets);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    })

};

export default PaymentEndpoint;

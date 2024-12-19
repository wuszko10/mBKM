import authToken from "../middleware/authToken";
import business from "../business/business.container";
import applicationException from "../service/applicationException";

const PaymentEndpoint = (router) => {



    router.post('/api/pay/wallet', authToken, async (req, res) => {
        const { amount, transactionId, userTicketId } = req.body;
        try {
            const tickets = await business.getPaymentManager().walletPayment(amount, transactionId, userTicketId);
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
        const { amount, topUpId, cardNumber, expiryDate, cvv, walletId } = req.body;
        try {
            const tickets = await business.getPaymentManager().cardPaymentTopUp(amount, topUpId, cardNumber, expiryDate, cvv, walletId);
            res.status(200).json(tickets);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    })

    router.post('/api/top-up/blik', authToken, async (req, res) => {
        const { amount, transactionId, code, walletId } = req.body;
        try {
            const tickets = await business.getPaymentManager().blikPaymentTopUp(amount, transactionId, code, walletId);
            res.status(200).json(tickets);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    })

};

export default PaymentEndpoint;

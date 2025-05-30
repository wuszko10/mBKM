import authToken from "../middleware/authToken";
import business from "../business/business.container";
import applicationException from "../service/applicationException";
import admin from "../middleware/admin";

const TransactionEndpoint = (router) => {

    router.get('/api/transactions', admin, async (req, res) => {
        const { page = 1, pageSize = 10, searchQuery } = req.query;
        const cache = req.app.locals.cache;
        try {
            const transactions = await business.getTransactionManager().getAndSearchTransaction(page, pageSize, searchQuery, cache);
            res.status(200).json(transactions);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    })

    router.get('/api/transactions/user/:userId', authToken, async (req, res) => {
        try {
            const transaction = await business.getTransactionManager().getTransactionByUserId(req.params.userId);
            res.status(200).json(transaction);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.get('/api/transaction', authToken, async (req, res) => {
        try {
            const transaction = await business.getTransactionManager().getTransactionById(req.query.id);
            res.status(200).json(transaction);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.post('/api/transaction/create', authToken, async (req, res) => {
        const {transactionData, userTicketData} = req.body;
        try {
            const transaction = await business.getTransactionManager().createNewTransaction(transactionData, userTicketData);
            res.status(201).json(transaction);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.delete('/api/transaction/rollback', authToken, async (req, res) => {
        const { transactionId, ticketId } = req.query;
        try {
            const result = await business.getRollbackManager().rollbackTransaction(transactionId, ticketId);
            res.status(200).json(result);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

};

export default TransactionEndpoint;

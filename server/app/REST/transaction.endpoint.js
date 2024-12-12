import authToken from "../middleware/authToken";
import business from "../business/business.container";
import applicationException from "../service/applicationException";

const TransactionEndpoint = (router) => {

    router.get('/api/transactions', authToken, async (req, res) => {
        const { page = 1, pageSize = 10, searchQuery } = req.query;
        const cache = req.app.locals.cache;
        try {
            const tickets = await business.getTransactionManager().getAndSearchTransaction(page, pageSize, searchQuery, cache);
            res.status(200).json(tickets);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    })

    router.get('/api/transactions/user/:userId', authToken, async (req, res) => {
        try {
            const relief = await business.getTransactionManager().getTransactionByUserId(req.params.userId);
            res.status(200).json(relief);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.get('/api/transaction/:id', authToken, async (req, res) => {
        try {
            const relief = await business.getTransactionManager().getTransactionById(req.params.id);
            res.status(200).json(relief);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.post('/api/transaction/create', authToken, async (req, res) => {
        try {
            const relief = await business.getTransactionManager().createNewOrUpdateTransaction(req.body);
            res.status(201).json(relief);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

};

export default TransactionEndpoint;

import authToken from "../middleware/authToken";
import business from "../business/business.container";
import applicationException from "../service/applicationException";

const PurchaseEndpoint = (router) => {

    router.get('/api/purchases', authToken, async (req, res) => {
        const { page = 1, pageSize = 10, searchQuery } = req.query;
        const cache = req.app.locals.cache;
        try {
            const tickets = await business.getPurchaseManager().getAndSearchPurchase(page, pageSize, searchQuery, cache);
            res.status(200).json(tickets);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    })

    router.get('/api/purchases/:userId', authToken, async (req, res) => {
        try {
            const relief = await business.getPurchaseManager().getPurchaseByUserId(req.params.userId);
            res.status(200).json(relief);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.get('/api/purchases/:id', authToken, async (req, res) => {
        try {
            const relief = await business.getPurchaseManager().getPurchase(req.params.id);
            res.status(200).json(relief);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.post('/api/purchase/create', authToken, async (req, res) => {
        try {
            const relief = await business.getPurchaseManager().createNewOrUpdatePurchase(req.body);
            res.status(201).json(relief);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

};

export default PurchaseEndpoint;

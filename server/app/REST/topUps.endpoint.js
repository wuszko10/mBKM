import business from '../business/business.container';
import applicationException from '../service/applicationException';
import authToken from '../middleware/authToken';
import admin from "../middleware/admin";

const TopUpEndpoint = (router) => {

    router.get('/api/top-ups', admin, async (req, res) => {
        const { page = 1, pageSize = 10, searchQuery } = req.query;
        const cache = req.app.locals.cache;
        try {
            const topUp = await business.getTopUpManager().getAndSearchTopUp(page, pageSize, searchQuery, cache);
            res.status(200).json(topUp);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    })

    router.get('/api/top-ups/all/:userId', authToken, async (req, res) => {
        try {
            const topUp = await business.getTopUpManager().getTopUpsByUserId(req.params.userId);
            res.status(200).json(topUp);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.get('/api/top-up/:id', authToken, async (req, res) => {
        try {
            const topUp = await business.getTopUpManager().getTopUp(req.params.id);
            res.status(200).json(topUp);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.post('/api/top-up/create', authToken, async (req, res) => {
        try {
            const topUp = await business.getTopUpManager().createNewOrUpdateTopUp(req.body);
            res.status(201).json(topUp);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.delete('/api/top-up/rollback', authToken, async (req, res) => {
        const { topUpId } = req.query;
        try {
            const result = await business.getRollbackManager().rollbackTopUp(topUpId);
            res.status(200).json(result);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

};

export default TopUpEndpoint;

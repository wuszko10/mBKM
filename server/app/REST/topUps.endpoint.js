import business from '../business/business.container';
import applicationException from '../service/applicationException';
import authToken from '../middleware/authToken';

const TopUpEndpoint = (router) => {

    router.get('/api/top-ups', authToken, async (req, res) => {
        const { page = 1, pageSize = 10, searchQuery } = req.query;
        const cache = req.app.locals.cache;
        try {
            const tickets = await business.getTopUpManager().getAndSearchTopUp(page, pageSize, searchQuery, cache);
            res.status(200).json(tickets);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    })

    router.get('/api/top-ups/:userId', authToken, async (req, res) => {
        try {
            const relief = await business.getTopUpManager().getTopUpsByUserId(req.params.userId);
            res.status(200).json(relief);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.get('/api/top-ups/:id', authToken, async (req, res) => {
        try {
            const relief = await business.getTopUpManager().getTopUp(req.params.id);
            res.status(200).json(relief);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.post('/api/top-up/create', authToken, async (req, res) => {
        try {
            const relief = await business.getTopUpManager().createNewOrUpdateTopUp(req.body);
            res.status(201).json(relief);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

};

export default TopUpEndpoint;

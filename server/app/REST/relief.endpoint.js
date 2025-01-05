import business from '../business/business.container';
import applicationException from '../service/applicationException';
import admin from '../middleware/admin';
import authToken from '../middleware/authToken';

const ReliefEndpoint = (router) => {

    router.get('/api/reliefs', authToken, async (req, res) => {
        const cache = req.app.locals.cache;
        try {
            let reliefs = await business.getReliefManager().getAllReliefs(cache);
            res.status(200).json(reliefs);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    })

    router.get('/api/relief/:id', authToken, async (req, res) => {
        try {
            const relief = await business.getReliefManager().getReliefById(req.params.id);
            res.status(200).json(relief);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.get('/api/reliefs/table', authToken, async (req, res) => {
        const { page = 1, pageSize = 10, searchQuery } = req.query;
        const cache = req.app.locals.cache;
        try {
            const tickets = await business.getReliefManager().getAndSearchRelief(page, pageSize, searchQuery, cache);
            res.status(200).json(tickets);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    })

    router.get('/api/relief/:name', authToken, async (req, res) => {
        try {
            const relief = await business.getReliefManager().getReliefById(req.params.name);
            res.status(200).json(relief);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.post('/api/relief', admin, async (req, res) => {
        try {
            const relief = await business.getReliefManager().createNewOrUpdateRelief(req.body);
            res.status(201).json(relief);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.delete('/api/relief/:id', admin, async (req, res) => {
        try {
            const result = await business.getReliefManager().removeReliefById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });
};

export default ReliefEndpoint;

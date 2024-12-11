import business from '../business/business.container';
import applicationException from '../service/applicationException';
import admin from '../middleware/admin';
import authToken from '../middleware/authToken';

const LineEndpoint = (router) => {

    router.get('/api/lines', authToken, async (req, res) => {
        try {
            let reliefs = await business.getLineManager().getAll();
            res.status(200).json(reliefs);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    })

    router.get('/api/line/:id', authToken, async (req, res) => {
        try {
            const relief = await business.getLineManager().getById(req.params.id);
            res.status(200).json(relief);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.get('/api/lines/table', authToken, async (req, res) => {
        const { page = 1, pageSize = 10, searchQuery } = req.query;
        try {
            const tickets = await business.getLineManager().getAndSearch(page, pageSize, searchQuery);
            res.status(200).json(tickets);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    })

    router.post('/api/line', admin, async (req, res) => {
        try {
            const relief = await business.getLineManager().createNewOrUpdate(req.body);
            res.status(201).json(relief);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.delete('/api/line/:id', admin, async (req, res) => {
        try {
            const result = await business.getLineManager().removeById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });
};

export default LineEndpoint;

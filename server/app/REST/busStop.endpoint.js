import business from '../business/business.container';
import applicationException from '../service/applicationException';
import admin from '../middleware/admin';
import authToken from '../middleware/authToken';

const BusStopEndpoint = (router) => {

    router.get('/api/stops', authToken, async (req, res) => {
        try {
            let reliefs = await business.getBusStopManager().getAll();
            res.status(200).json(reliefs);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    })

    router.get('/api/stop/:id', authToken, async (req, res) => {
        try {
            const relief = await business.getBusStopManager().getById(req.params.id);
            res.status(200).json(relief);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.get('/api/stops/table', authToken, async (req, res) => {
        const { page = 1, pageSize = 10, searchQuery } = req.query;
        try {
            const tickets = await business.getBusStopManager().getAndSearch(page, pageSize, searchQuery);
            res.status(200).json(tickets);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    })

    router.post('/api/stop', admin, async (req, res) => {
        try {
            const relief = await business.getBusStopManager().createNewOrUpdate(req.body);
            res.status(201).json(relief);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.delete('/api/stop/:id', admin, async (req, res) => {
        try {
            const result = await business.getBusStopManager().removeById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });
};

export default BusStopEndpoint;

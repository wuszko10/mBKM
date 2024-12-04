import business from '../business/business.container';
import applicationException from '../service/applicationException';
import admin from '../middleware/admin';
import authToken from '../middleware/authToken';
import authUserRole from "../middleware/authUserRole";

const ReliefEndpoint = (router) => {

    router.get('/api/reliefs', authToken, async (req, res, next) => {
        try {
            const reliefs = await business.getReliefManager().getAllReliefs();
            res.status(200).json(reliefs);
        } catch (error) {
            next(error);
        }
    })

    router.get('/api/relief/:id', authToken, async (req, res, next) => {
        try {
            const relief = await business.getReliefManager().getReliefById(req.params.id);
            res.status(200).json(relief);
        } catch (error) {
            next(error);
        }
    });

    router.get('/api/relief/:name', authToken, async (req, res, next) => {
        try {
            const relief = await business.getReliefManager().getReliefById(req.params.name);
            res.status(200).json(relief);
        } catch (error) {
            next(error);
        }
    });

    router.post('/api/relief', authToken, authUserRole('admin'), async (req, res, next) => {
        try {
            const relief = await business.getReliefManager().createNewOrUpdateRelief(req.body);
            res.status(201).json(relief);
        } catch (error) {
            next(error);
        }
    });

    router.delete('/api/relief/:id', authToken, authUserRole('admin'), async (req, res, next) => {
        try {
            const result = await business.getReliefManager().removeReliefById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    });
};

export default ReliefEndpoint;

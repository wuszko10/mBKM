import business from '../business/business.container';
import applicationException from '../service/applicationException';
import admin from '../middleware/admin';
import authToken from '../middleware/authToken';

const RollbackEndpoint = (router) => {

    router.delete('/api/rollback', admin, async (req, res) => {
        const { transactionId, ticketId } = req.params;
        try {
            const result = await business.getRollbackManager().rollbackTransaction(transactionId, ticketId);
            res.status(200).json(result);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });
};

export default RollbackEndpoint;

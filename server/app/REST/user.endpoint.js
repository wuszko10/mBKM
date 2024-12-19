import business from '../business/business.container';
import applicationException from '../service/applicationException';
import admin from '../middleware/admin';
import authToken from '../middleware/authToken';

const userEndpoint = (router) => {

    router.get('/api/users', admin, async (request, response) => {
        const { page = 1, pageSize = 10, searchQuery } = request.query;
        try {
            let result = await business.getUserManager().getAllUsers(page, pageSize, searchQuery);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.post('/api/user/auth', async (request, response) => {
        try {
            let result = await business.getUserManager().authenticate(request.body.email, request.body.password);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.post('/api/user/create', async (request, response) => {
        try {
            const result = await business.getUserManager().createNewOrUpdate(request.body);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.delete('/api/user/logout/:userId', authToken, async (request, response) => {
        try {
            let result = await business.getUserManager().removeHashSession(request.body.userId);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });
};

export default userEndpoint;

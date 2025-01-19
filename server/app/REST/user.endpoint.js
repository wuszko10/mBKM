import business from '../business/business.container';
import applicationException from '../service/applicationException';
import admin from '../middleware/admin';
import authToken from "../middleware/authToken";

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

    router.get('/api/user', admin, async (request, response) => {
        try {
            let result = await business.getUserManager().getUserById(request.query.id);
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
        const {userData, addressData} = request.body;
        try {
            const result = await business.getUserManager().createNewOrUpdate(userData, addressData);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.post('/api/user/restore/check', async (request, response) => {
        const {email, checkPesel} = request.body;
        try {
            const result = await business.getUserManager().checkResetPasswordByUserEmail(email, checkPesel);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.post('/api/user/reset', authToken, async (request, response) => {
        const {email, oldPassword, newPassword} = request.body;
        try {
            const result = await business.getUserManager().resetPassword(email, oldPassword, newPassword);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.post('/api/user/restore', async (request, response) => {
        const {email, newPassword} = request.body;
        try {
            const result = await business.getUserManager().restorePassword(email, newPassword);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.post('/api/user/address/update', authToken, async (request, response) => {
        try {
            const result = await business.getUserManager().updateAddress(request.body);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.post('/api/user/deactivate', admin, async (request, response) => {
        try {
            const result = await business.getUserManager().activateOrDeactivateUser(request.body.id);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.delete('/api/user/logout', async (request, response) => {
        try {
            let result = await business.getUserManager().removeHashSession(request.query.userId, request.query.token);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

};

export default userEndpoint;

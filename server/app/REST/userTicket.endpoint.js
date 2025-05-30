import authToken from "../middleware/authToken";
import business from "../business/business.container";
import applicationException from "../service/applicationException";

const UserTicketEndpoint = (router) => {

    router.get('/api/user-ticket/user/:userId', authToken, async (req, res) => {
        try {
            const relief = await business.getUserTicketManager().getUserTicketByUserId(req.params.userId);
            res.status(200).json(relief);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.get('/api/user-ticket/dashboard/user/:userId', authToken, async (req, res) => {
        try {
            const relief = await business.getUserTicketManager().getDashboardUserTicketByUserId(req.params.userId);
            res.status(200).json(relief);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.get('/api/user-ticket/:id', authToken, async (req, res) => {
        try {
            const relief = await business.getUserTicketManager().getUserTicketById(req.params.id);
            res.status(200).json(relief);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.post('/api/user-ticket/create', authToken, async (req, res) => {
        try {
            const relief = await business.getUserTicketManager().createNewOrUpdateUserTicket(req.body);
            res.status(201).json(relief);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.post('/api/user-ticket/validate', authToken, async (req, res) => {
        try {
            const relief = await business.getUserTicketManager().validateUserTicket(req.body.userTicketId);
            res.status(201).json(relief);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

};

export default UserTicketEndpoint;

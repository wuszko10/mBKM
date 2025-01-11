import authToken from '../middleware/authToken';
import business from '../business/business.container';
import admin from "../middleware/admin";
import applicationException from "../service/applicationException";
const TicketEndpoint = (router) => {

    router.get('/api/tickets', authToken, async (req, res) => {
        const cache = req.app.locals.cache;
        try {
            const tickets = await business.getTicketManager().getAllTickets(cache);
            res.status(200).json(tickets);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    })

    router.get('/api/tickets/table', authToken, async (req, res) => {
        const { page = 1, pageSize = 10, searchQuery, removeDuplicates } = req.query;
        const cache = req.app.locals.cache;
        try {
            const tickets = await business.getTicketManager().getAndSearchTicket(page, pageSize, searchQuery, cache, removeDuplicates);
            res.status(200).json(tickets);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    })

    router.get('/api/ticket/:id', authToken, async (req, res) => {
        try {
            const ticket = await business.getTicketManager().getById(req.params.id);
            res.status(200).json(ticket);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });

    router.post('/api/ticket', admin, async (request, response) => {
        try {
            const result = await business.getTicketManager().createNewOrUpdateTicket(request.body);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.delete('/api/ticket/:id', admin, async (req, res) => {
        try {
            const result = await business.getTicketManager().removeById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    });
};

export default TicketEndpoint;

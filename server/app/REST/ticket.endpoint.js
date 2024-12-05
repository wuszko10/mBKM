import authToken from '../middleware/authToken';
import business from '../business/business.container';
import authUserRole from "../middleware/authUserRole";
import admin from "../middleware/admin";
const TicketEndpoint = (router) => {

    router.get('/api/tickets', authToken, async (req, res, next) => {
        try {
            const tickets = await business.getTicketManager(req).getAllTickets();
            res.status(200).json(tickets);
        } catch (error) {
            next(error);
        }
    })

    router.get('/api/tickets/table', authToken, async (req, res, next) => {
        const { page = 1, pageSize = 10, searchQuery } = req.query;
        const cache = req.app.locals.cache;
        try {
            const tickets = await business.getTicketManager(req).getAndSearchTicket({ page, pageSize, searchQuery, cache });
            res.status(200).json(tickets);
        } catch (error) {
            next(error);
        }
    })

    router.get('/api/ticket/:id', authToken, async (req, res, next) => {
        try {
            const ticket = await business.getTicketManager(req).getById(req.params.id);
            res.status(200).json(ticket);
        } catch (error) {
            next(error);
        }
    });

    router.post('/api/ticket', admin, async (req, res, next) => {
        try {
            const ticket = await business.getTicketManager(req).createNewOrUpdateTicket(req.body);
            res.status(201).json(ticket);
        } catch (error) {
            next(error);
        }
    });

    router.delete('/api/ticket/:id', admin, async (req, res, next) => {
        try {
            const result = await business.getTicketManager(req).removeById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    });
};

export default TicketEndpoint;

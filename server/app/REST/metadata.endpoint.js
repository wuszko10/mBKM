import authToken from "../middleware/authToken";
import admin from "../middleware/admin";
import business from "../business/business.container";
import applicationException from "../service/applicationException";

const MetadataEndpoint = (router) => {

    router.get('/api/metadata', authToken, (req, res) => {

        const { cache } = req.app.locals;

        const ticketTypes = cache.get("ticketTypes");
        const ticketPeriods = cache.get("ticketPeriods");
        const ticketLines = cache.get("ticketLines");
        const reliefTypes = cache.get("reliefTypes");
        const paymentMethods = cache.get("paymentMethods");
        const statusTypes = cache.get("statusTypes");

        if (!ticketTypes || !ticketPeriods || !ticketLines || !reliefTypes || !paymentMethods || !statusTypes) {
            return res.status(404).json({ message: 'One or more metadata are not found in cache.' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.json({
            ticketTypes,
            ticketPeriods,
            ticketLines,
            reliefTypes,
            paymentMethods,
            statusTypes
        });
    });

    router.get('/api/admin/dashboard/:days', admin, async (req, res) => {
        try {
            const response = await business.getMetadataManager().getDashboardStats(req.params.days);
            res.status(200).json(response);
        } catch (error) {
            applicationException.errorHandler(error, res);
        }
    })
}

export default MetadataEndpoint;

import authToken from "../middleware/authToken";

const MetadataEndpoint = (router) => {

    router.get('/api/metadata', authToken, (req, res) => {

        const { cache } = req.app.locals;

        const ticketTypes = cache.get("ticketTypes");
        const ticketPeriods = cache.get("ticketPeriods");
        const ticketLines = cache.get("ticketLines");
        const reliefTypes = cache.get("reliefTypes");

        if (!ticketTypes || !ticketPeriods || !ticketLines || !reliefTypes) {
            return res.status(404).json({ message: 'One or more metadata are not found in cache.' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.json({
            ticketTypes,
            ticketPeriods,
            ticketLines,
            reliefTypes
        });
    });
}

export default MetadataEndpoint;

import applicationException from "../service/applicationException";
import TicketTypeDAO from "../DAO/metadata/ticketTypeDAO";
import TicketPeriodDAO from "../DAO/metadata/ticketPeriodDAO";
import TicketLineDAO from "../DAO/metadata/ticketLineDAO";
import ReliefTypeDAO from "../DAO/metadata/reliefTypeDAO";

async function loadMetadataToCache(cache) {

    try {
        const ticketTypes = await TicketTypeDAO.get();
        const ticketPeriods = await TicketPeriodDAO.get();
        const ticketLines = await TicketLineDAO.get();
        const reliefTypes = await ReliefTypeDAO.get();

        cache.set("ticketTypes", ticketTypes);
        cache.set("ticketPeriods", ticketPeriods);
        cache.set("ticketLines", ticketLines);
        cache.set("reliefTypes", reliefTypes);

    } catch (err) {
        console.error('Error loading metadata:', err);
        throw applicationException.new(applicationException.INTERNAL_SERVER_ERROR, 'Error loading metadata.');
    }
}


const loadMetadataMiddleware = (req, res, next) => {

    const { cache } = req.app.locals;

    if (!cache.get("ticketTypes") || !cache.get("ticketPeriods") || !cache.get("ticketLines") || !cache.get("reliefTypes")) {
        loadMetadataToCache(cache).then(() => {
            next();
        }).catch(err => {
            res.status(500).json({ message: 'Failed to load metadata' });
        });
    } else {
        next();
    }
};

export { loadMetadataMiddleware };

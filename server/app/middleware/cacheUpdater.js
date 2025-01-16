import businessContainer from "../business/business.container";

const loadMetadataMiddleware = (req, res, next) => {

    const { cache } = req.app.locals;

    if (!cache.get("ticketTypes") || !cache.get("ticketPeriods") || !cache.get("ticketLines") || !cache.get("reliefTypes") || !cache.get("paymentMethods") || !cache.get("statusTypes")) {
        businessContainer.getMetadataManager().loadMetadataToCache(cache).then(() => {
            next();
        }).catch(err => {
            res.status(500).json({ message: 'Failed to load metadata' + err });
        });
    } else {
        next();
    }
};

export { loadMetadataMiddleware };

import businessContainer from "../business/business.container";

const loadMetadataMiddleware = (req, res, next) => {
    const { cache } = req.app.locals;

    const requiredKeys = [
        "ticketTypes",
        "ticketPeriods",
        "ticketLines",
        "reliefTypes",
        "paymentMethods",
        "statusTypes"
    ];

    const isCacheMissing = requiredKeys
        .some(key => !cache.get(key));

    if (isCacheMissing) {
        businessContainer.getMetadataManager()
            .loadMetadataToCache(cache).then(() => {
            next();
        }).catch(err => {
            res.status(500).json(
                { message: 'Failed to load metadata: ' + err });
        });
    } else {
        next();
    }
};

export { loadMetadataMiddleware };

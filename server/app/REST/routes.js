import userEndpoint from './user.endpoint';
import ticketEndpoint from "./ticket.endpoint";
import reliefEndpoint from "./relief.endpoint";
import metadataEndpoint from "./metadata.endpoint";
import busStopEndpoint from "./busStop.endpoint";
import purchaseEndpoint from "./purchase.endpoint";
import topUpsEndpoint from "./topUps.endpoint";
import lineEndpoint from "./line.endpoint";

const routes = function (router) {
    userEndpoint(router);
    ticketEndpoint(router);
    reliefEndpoint(router);
    metadataEndpoint(router);
    busStopEndpoint(router);
    purchaseEndpoint(router);
    topUpsEndpoint(router);
    lineEndpoint(router);
}

export default routes;

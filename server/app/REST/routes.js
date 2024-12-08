import userEndpoint from './user.endpoint';
import ticketEndpoint from "./ticket.endpoint";
import reliefEndpoint from "./relief.endpoint";
import metadataEndpoint from "./metadata.endpoint";
import busStopEndpoint from "./busStop.endpoint";
import purchaseManager from "../business/purchase.manager";
import purchaseEndpoint from "./purchase.endpoint";
import topUpsEndpoint from "./topUps.endpoint";

const routes = function (router) {
    userEndpoint(router);
    ticketEndpoint(router);
    reliefEndpoint(router);
    metadataEndpoint(router);
    busStopEndpoint(router);
    purchaseEndpoint(router);
    topUpsEndpoint(router);
}

export default routes;

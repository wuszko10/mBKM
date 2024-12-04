import userEndpoint from './user.endpoint';
import ticketEndpoint from "./ticket.endpoint";
import reliefEndpoint from "./relief.endpoint";
import metadataEndpoint from "./metadata.endpoint";

const routes = function (router) {
    userEndpoint(router);
    ticketEndpoint(router);
    reliefEndpoint(router);
    metadataEndpoint(router);
}

export default routes;

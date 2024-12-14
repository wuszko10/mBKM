import userEndpoint from './user.endpoint';
import ticketEndpoint from "./ticket.endpoint";
import reliefEndpoint from "./relief.endpoint";
import metadataEndpoint from "./metadata.endpoint";
import busStopEndpoint from "./busStop.endpoint";
import topUpsEndpoint from "./topUps.endpoint";
import lineEndpoint from "./line.endpoint";
import transactionEndpoint from "./transaction.endpoint";
import paymentEndpoint from "./payment.endpoint";
import userTicketEndpoint from "./userTicket.endpoint";
import rollbackEndpoint from "./rollback.endpoint";

const routes = function (router) {
    userEndpoint(router);
    ticketEndpoint(router);
    reliefEndpoint(router);
    metadataEndpoint(router);
    busStopEndpoint(router);
    transactionEndpoint(router);
    topUpsEndpoint(router);
    lineEndpoint(router);
    paymentEndpoint(router);
    userTicketEndpoint(router);
    rollbackEndpoint(router);
}

export default routes;

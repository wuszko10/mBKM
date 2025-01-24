import userManager from './user.manager';
import ticketManager from "./ticket.manager";
import reliefManager from "./relief.manager";
import busStopManager from "./busStop.manager";
import topUpManager from "./topUp.manager";
import lineManager from "./line.manager";
import transactionManager from "./transaction.manager";
import paymentManager from "./payment.manager";
import userTicketManager from "./userTicket.manager";
import rollbackManager from "./rollback.manager";
import metadataManager from "./metadata.manager";


function getter(manager, request) {
  return function () {
    return manager.create(request, this);
  };
}

export default {
    getUserManager: getter(userManager),
    getTicketManager: getter(ticketManager),
    getReliefManager: getter(reliefManager),
    getBusStopManager: getter(busStopManager),
    getTransactionManager: getter(transactionManager),
    getTopUpManager: getter(topUpManager),
    getLineManager: getter(lineManager),
    getPaymentManager: getter(paymentManager),
    getUserTicketManager: getter(userTicketManager),
    getRollbackManager: getter(rollbackManager),
    getMetadataManager: getter(metadataManager),
};

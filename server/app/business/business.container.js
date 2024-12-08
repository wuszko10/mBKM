//import xyzManager from './xyz.manager';
import userManager from './user.manager';
import ticketManager from "./ticket.manager";
import reliefManager from "./relief.manager";
import busStopManager from "./busStop.manager";
import purchaseManager from "./purchase.manager";
import topUpManager from "./topUp.manager";


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
    getPurchaseManager: getter(purchaseManager),
    getTopUpManager: getter(topUpManager),
};

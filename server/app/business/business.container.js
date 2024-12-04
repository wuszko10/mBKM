//import xyzManager from './xyz.manager';
import userManager from './user.manager';
import ticketManager from "./ticket.manager";
import reliefManager from "./relief.manager";


function getter(manager, request) {
  return function () {
    return manager.create(request, this);
  };
}

export default {
    getUserManager: getter(userManager),
    getTicketManager: getter(ticketManager),
    getReliefManager: getter(reliefManager)
};

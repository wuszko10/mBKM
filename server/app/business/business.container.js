//import xyzManager from './xyz.manager';
import userManager from './user.manager';


function getter(manager, request) {
  return function () {
    return manager.create(request, this);
  };
}

export default {
    //getXyzManager: getter(xyzManager)
    getUserManager: getter(userManager)
};
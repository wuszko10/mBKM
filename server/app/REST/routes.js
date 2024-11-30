//import xyzEndpoint from './xyz.endpoint';
import userEndpoint from './user.endpoint';

const routes = function (router) {
    //xyzEndpoint(router);
    userEndpoint(router);
}

export default routes;
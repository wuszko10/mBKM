import UserDAO from '../DAO/user/userDAO';
import applicationException from '../service/applicationException';
import TopUpDAO from "../DAO/topUpDAO";
import {getTopUpUserNames, topUpsMappingIdsToNames} from "../service/topUpManager.service";

function create() {


    async function createNewOrUpdateTopUp(data) {
        try {
            return await TopUpDAO.createNewOrUpdateTopUp(data);
        } catch (error) {
            throw applicationException.new(applicationException.BAD_REQUEST, 'Error while creating or updating top up');
        }
    }

    async function getAndSearchTopUp(queryPage, queryPageSize, searchQuery, cache) {

        const users = await UserDAO.getAll();
        const paymentMethods = cache.get("paymentMethods");

        const searchCriteria = topUpsMappingIdsToNames(users, paymentMethods, searchQuery)

        try {
            const {
                data,
                page,
                pageSize,
                totalPages,
                totalRecords,
            } = await TopUpDAO.getAndSearchTopUp(queryPage, queryPageSize, searchCriteria);

            const topUps = getTopUpUserNames(data, paymentMethods, users);

            return {
                data: topUps,
                page,
                pageSize,
                totalPages,
                totalRecords,
            }

        } catch (error) {
            throw applicationException.new(applicationException.NOT_FOUND, `Top ups not found`);
        }
    }

    async function getTopUpsByUserId(id) {
        try {
            return await TopUpDAO.getTopUpsByUserId(id);
        } catch (error) {
            throw applicationException.new(applicationException.NOT_FOUND, `Top up with ID ${id} not found`);
        }
    }

    async function getTopUp(id) {
        try {
            return await TopUpDAO.getTopUp(id);
        } catch (error) {
            throw applicationException.new(applicationException.NOT_FOUND, `Top up with ID ${id} not found`);
        }
    }

    return {
        createNewOrUpdateTopUp: createNewOrUpdateTopUp,
        getAndSearchTopUp: getAndSearchTopUp,
        getTopUpsByUserId: getTopUpsByUserId,
        getTopUp: getTopUp
    };
}

export default {
    create: create
};

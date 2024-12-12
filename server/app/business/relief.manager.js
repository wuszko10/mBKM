import applicationException from '../service/applicationException';
import ReliefDAO from "../DAO/reliefDAO";
import {getReliefTypesNames, reliefMappingIdsToNames} from "../service/reliefManager.service";

function create(context) {


  async function createNewOrUpdateRelief(reliefData) {
    try {
      return await ReliefDAO.createNewOrUpdateRelief(reliefData);
    } catch (error) {
      throw applicationException.new(applicationException.BAD_REQUEST, 'Error while creating or updating relief');
    }
  }

  async function getReliefByName(name){
    try {
      return await ReliefDAO.getReliefByName(name);
    } catch (error) {
      throw applicationException.new(applicationException.UNAUTHORIZED, 'Relief with that name does not exist');
    }
  }

  async function getAndSearchRelief(page, pageSize, searchQuery, cache) {

    const reliefTypes = cache.get("reliefTypes");
    const ticketTypes = cache.get("ticketTypes");
    const searchCriteria = reliefMappingIdsToNames(reliefTypes, ticketTypes, searchQuery);

    try {
      const {
        data,
        page,
        pageSize,
        totalPages,
        totalRecords,
      } = await ReliefDAO.getAndSearchRelief(page, pageSize, searchCriteria);
      const reliefs = getReliefTypesNames(data, reliefTypes, ticketTypes);
      return {
        data: reliefs,
        page,
        pageSize,
        totalPages,
        totalRecords,
      }
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Reliefs not found`);
    }
  }

  async function getAllReliefs(cache) {

    const reliefTypes = cache.get("reliefTypes");
    const ticketTypes = cache.get("ticketTypes");

    try {
      const reliefs = await ReliefDAO.getAllReliefs();
      return getReliefTypesNames(reliefs, reliefTypes, ticketTypes);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, 'Error while getting reliefs');
    }
  }

  async function getReliefById(reliefId) {
    try {
      return await ReliefDAO.getTicket(reliefId);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Relief with ID ${reliefId} not found`);
    }
  }

  async function removeReliefById(reliefId) {
    try {
      await ReliefDAO.removeReliefById(reliefId);
      return { message: `Relief with ID ${reliefId} successfully removed` };
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Relief with ID ${reliefId} not found`);
    }
  }

  return {
    createNewOrUpdateRelief:createNewOrUpdateRelief,
    getReliefByName:getReliefByName,
    getAndSearchRelief: getAndSearchRelief,
    getAllReliefs:getAllReliefs,
    getReliefById:getReliefById,
    removeReliefById:removeReliefById
  };
}

export default {
  create: create
};

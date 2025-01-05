import applicationException from '../service/applicationException';
import LineDAO from "../DAO/lineDAO";
import UserTicketDAO from "../DAO/user/userTicketDAO";

function create() {


  async function createNewOrUpdate(data) {
    try {
      return await LineDAO.createNewOrUpdate(data);
    } catch (error) {
      throw applicationException.new(applicationException.BAD_REQUEST, 'Error while creating or updating relief');
    }
  }

  async function getAndSearch(page, pageSize, searchQuery) {
    try {
      return await LineDAO.getAndSearch(page, pageSize, searchQuery);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Lines not found`);
    }
  }

  async function getAll() {
    try {
      return await LineDAO.getAll();
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, 'Error while getting lines');
    }
  }

  async function getById(id) {
    try {
      return await LineDAO.getById(id);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Line with ID ${id} not found`);
    }
  }

  async function removeById(id) {

    const isUsedInTickets = await UserTicketDAO.getByLineId(id);

    if (isUsedInTickets){
      throw applicationException.new(applicationException.METHOD_NOT_ALLOWED, `Line with ID ${id} cannot be remove successfully`);
    }

    try {
      await LineDAO.removeById(id);
      return { message: `Line with ID ${id} successfully removed` };
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Line with ID ${id} not found`);
    }
  }

  return {
    createNewOrUpdate:createNewOrUpdate,
    getAndSearch:getAndSearch,
    getAll: getAll,
    getById:getById,
    removeById:removeById
  };
}

export default {
  create: create
};

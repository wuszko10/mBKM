import applicationException from '../service/applicationException';
import BusStopDAO from "../DAO/BusStopDAO";

function create(context) {


  async function createNewOrUpdate(data) {
    try {
      return await BusStopDAO.createNewOrUpdate(data);
    } catch (error) {
      throw applicationException.new(applicationException.BAD_REQUEST, 'Error while creating or updating bus stop');
    }
  }

  async function getAndSearch(page, pageSize, searchQuery) {
    try {
      return await BusStopDAO.getAndSearch(page, pageSize, searchQuery);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Bus stops not found`);
    }
  }

  async function getAll() {
    try {
      return await BusStopDAO.getAll();
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, 'Error while getting bus stops');
    }
  }

  async function getById(id) {
    try {
      return await BusStopDAO.getById(id);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Bus stop with ID ${id} not found`);
    }
  }

  async function removeById(id) {
    try {
      await BusStopDAO.removeById(id);
      return { message: `Bus stop with ID ${id} successfully removed` };
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Bus stop with ID ${id} not found`);
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

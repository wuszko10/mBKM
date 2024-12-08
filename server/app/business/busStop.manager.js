import PasswordDAO from '../DAO/passwordDAO';
import TokenDAO from '../DAO/tokenDAO';
import UserDAO from '../DAO/userDAO';
import applicationException from '../service/applicationException';
import sha1 from 'sha1';
import TicketDAO from "../DAO/ticketDAO";
import ReliefDAO from "../DAO/reliefDAO";
import BusStopDAO from "../DAO/BusStopDAO";

function create(context) {


  async function createNewOrUpdate(data) {
    try {
      return await BusStopDAO.createNewOrUpdate(data);
    } catch (error) {
      throw applicationException.new(applicationException.BAD_REQUEST, 'Error while creating or updating relief');
    }
  }

  async function getAndSearch(page, pageSize, searchQuery) {
    try {
      return await BusStopDAO.getAndSearch(page, pageSize, searchQuery);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Reliefs not found`);
    }
  }

  async function getAll() {
    try {
      return await BusStopDAO.getAll();
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, 'Error while getting reliefs');
    }
  }

  async function getById(id) {
    try {
      return await BusStopDAO.getById(id);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Relief with ID ${id} not found`);
    }
  }

  async function removeById(id) {
    try {
      await BusStopDAO.removeById(id);
      return { message: `Relief with ID ${id} successfully removed` };
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Relief with ID ${id} not found`);
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

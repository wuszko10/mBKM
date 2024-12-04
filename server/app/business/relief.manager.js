import PasswordDAO from '../DAO/passwordDAO';
import TokenDAO from '../DAO/tokenDAO';
import UserDAO from '../DAO/userDAO';
import applicationException from '../service/applicationException';
import sha1 from 'sha1';
import TicketDAO from "../DAO/ticketDAO";
import ReliefDAO from "../DAO/reliefDAO";

function create(context) {


  async function createNewOrUpdateRelief(req, reliefData) {
    try {
      return await ReliefDAO.createNewOrUpdateRelief(req, reliefData);
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

  async function getAllReliefs() {
    try {
      return await ReliefDAO.getReliefByName(name);
    } catch (error) {
      throw applicationException.new(applicationException.UNAUTHORIZED, 'Error while getting reliefs');
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
    getAllReliefs:getAllReliefs,
    getReliefById:getReliefById,
    removeReliefById:removeReliefById
  };
}

export default {
  create: create
};

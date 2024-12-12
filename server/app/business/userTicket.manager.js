import applicationException from '../service/applicationException';
import UserTicketDAO from "../DAO/user/userTicketDAO";

function create(context) {

  async function createNewOrUpdateUserTicket(data) {
    try {
      return await UserTicketDAO.createNewOrUpdateUserTicket(data);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, 'Error while creating or updating user tickets');
    }
  }

  async function getUserTicketByUserId(id) {
    try {
      return await UserTicketDAO.getUserTicketByUserId(id);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Ticket with ID ${id} not found`);
    }
  }

  async function getUserTicketById(id) {
    try {
      return await UserTicketDAO.getUserTicketById(id);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Ticket with ID ${id} not found`);
    }
  }


  return {
    createNewOrUpdateUserTicket,
    getUserTicketByUserId,
    getUserTicketById
  };
}

export default {
  create,
};

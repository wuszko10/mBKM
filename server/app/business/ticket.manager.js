import TicketDAO, {TicketModel} from '../DAO/ticketDAO';
import applicationException from '../service/applicationException';

function create(context) {

  async function createNewOrUpdateTicket(ticketData) {
    try {
      return await TicketDAO.createNewOrUpdateTicket(ticketData);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, 'Error while creating or updating tickets');
    }
  }
  async function getAllTickets() {

    try {
      return await TicketDAO.getAllTickets();
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Tickets not found`);
    }
  }

  async function getAndSearchTicket({ page = 1, pageSize = 1, searchQuery = '', cache }) {

    try {
      return await TicketDAO.getAndSearchTicket(page, pageSize,searchQuery,cache);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Tickets not found`);
    }
  }



  async function getById(ticketId) {
    try {
      return await TicketDAO.getTicket(ticketId);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Ticket with ID ${ticketId} not found`);
    }
  }

  async function removeById(ticketId) {
    try {
      await TicketDAO.removeTicketById(ticketId);
      return { message: `Ticket with ID ${ticketId} successfully removed` };
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Ticket with ID ${ticketId} not found`);
    }
  }

  return {
    createNewOrUpdateTicket: createNewOrUpdateTicket,
    getAllTickets,
    getAndSearchTicket,
    getById,
    removeById,
  };
}

export default {
  create,
};

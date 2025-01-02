import TicketDAO from '../DAO/ticketDAO';
import applicationException from '../service/applicationException';
import {
  getMetadataNames,
  mappingIdsToNames
} from "../service/ticketManager.service";

function create(context) {

  async function createNewOrUpdateTicket(ticketData) {
    try {
      return await TicketDAO.createNewOrUpdateTicket(ticketData);
    } catch (error) {
      if (error.error.code === 405) {
        throw applicationException.new(applicationException.METHOD_NOT_ALLOWED,'Bilet z podanymi parametrami i datami już istnieje lub daty nachodzą się na inne bilety.');
      }
      throw applicationException.new(applicationException.NOT_FOUND, 'Error while creating or updating tickets');
    }
  }
  async function getAllTickets(cache) {

    const ticketTypes = cache.get("ticketTypes");
    const ticketPeriods = cache.get("ticketPeriods");
    const ticketLines = cache.get("ticketLines");

    try {
      const tickets = await TicketDAO.getAllTickets();

      return getMetadataNames(tickets, ticketTypes, ticketPeriods, ticketLines);

    } catch (error) {
      throw applicationException.new(applicationException.BAD_REQUEST, `Tickets not found`);
    }
  }

  async function getAndSearchTicket(queryPage, queryPageSize, searchQuery, cache) {

    const ticketTypes = cache.get("ticketTypes");
    const ticketPeriods = cache.get("ticketPeriods");
    const ticketLines = cache.get("ticketLines");

    const searchCriteria = mappingIdsToNames(ticketTypes, ticketPeriods, ticketLines, searchQuery);

    try {

      const {
        data,
          page,
          pageSize,
          totalPages,
          totalRecords,
      } = await TicketDAO.getAndSearchTicket(queryPage, queryPageSize, searchCriteria)

      const tickets = getMetadataNames(data, ticketTypes, ticketPeriods, ticketLines);

      return {
        data: tickets,
        page,
        pageSize,
        totalPages,
        totalRecords,
      }
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

    console.log("id: " + ticketId)
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

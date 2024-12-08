import UserDAO from '../DAO/userDAO';
import applicationException from '../service/applicationException';
import TicketDAO from "../DAO/ticketDAO";
import PurchaseDAO from "../DAO/purchaseDAO";

function create(context) {


  async function createNewOrUpdatePurchase(data) {
    try {
      return await PurchaseDAO.createNewOrUpdatePurchase(data);
    } catch (error) {
      throw applicationException.new(applicationException.BAD_REQUEST, 'Error while creating or updating relief');
    }
  }

  async function getAndSearchPurchase(page, pageSize, searchQuery) {

    const users = await UserDAO.getAll();
    const tickets = await TicketDAO.getAllTickets()

    try {
      return await PurchaseDAO.getAndSearchPurchase(page, pageSize, searchQuery, users, tickets);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Reliefs not found`);
    }
  }

  async function getPurchaseByUserId(id) {
    try {
      return await PurchaseDAO.getPurchaseByUserId(id);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Relief with ID ${id} not found`);
    }
  }

  async function getPurchase(id) {
    try {
      return await PurchaseDAO.getPurchase(id);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Relief with ID ${id} not found`);
    }
  }

  return {
    createNewOrUpdatePurchase: createNewOrUpdatePurchase,
    getAndSearchPurchase: getAndSearchPurchase,
    getPurchaseByUserId: getPurchaseByUserId,
    getPurchase: getPurchase
  };
}

export default {
  create: create
};

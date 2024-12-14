import UserDAO from '../DAO/user/userDAO';
import applicationException from '../service/applicationException';
import TicketDAO from "../DAO/ticketDAO";
import PurchaseDAO from "../DAO/transactionDAO";
import TransactionDAO from "../DAO/transactionDAO";
import {getMetadataNames, transactionMappingIdsToNames} from "../service/transactionManager.service";
import UserTicketDAO from "../DAO/user/userTicketDAO";
import TopUpDAO from "../DAO/topUpDAO";
import mongoConverter from "../service/mongoConverter";

function create(context) {


  async function createNewTransaction(transactionData, ticketData, userId) {

    let ticket;

    transactionData.userId = userId;
    const transaction = await TransactionDAO.createNewOrUpdateTransaction(transactionData);

    if (!transaction){
      throw applicationException.new(applicationException.BAD_REQUEST, 'Transaction does not created');
    }

    ticketData.transactionId = transaction._id;
    ticketData.userId = userId;

    ticket = await UserTicketDAO.createNewOrUpdateUserTicket(ticketData);

    if (!ticket){
      throw applicationException.new(applicationException.BAD_REQUEST, 'Ticket does not created');
    }

    return {
        transactionId: transaction._id,
        transactionNumber: transaction.number,
        paymentMethodId: transaction.methodId,
        transactionAmount: transaction.finalPrice,
        userTicketId: ticket._id,
    }
  }

  async function getAndSearchTransaction(page, pageSize, searchQuery) {

    const users = await UserDAO.getAll();
    const tickets = await TicketDAO.getAllTickets()

    const searchCriteria = transactionMappingIdsToNames(users, tickets, searchQuery);

    try {
      const {
        data,
        page,
        pageSize,
        totalPages,
        totalRecords,
      } = await TransactionDAO.getAndSearchTransaction(page, pageSize, searchCriteria);

      const transactions = getMetadataNames(data, tickets, users)

      return {
        data: transactions,
        page,
        pageSize,
        totalPages,
        totalRecords,
      }
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Transactions not found`);
    }
  }

  async function getTransactionByUserId(id) {
    try {
      return await TransactionDAO.getTransactionByUserId(id);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Transaction with ID ${id} not found`);
    }
  }

  async function getTransactionById(id) {
    try {
      return await TransactionDAO.getTransactionById(id);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Transaction with ID ${id} not found`);
    }
  }


  return {
    createNewTransaction: createNewTransaction,
    getAndSearchTransaction: getAndSearchTransaction,
    getTransactionByUserId: getTransactionByUserId,
    getTransactionById: getTransactionById
  };
}

export default {
  create: create
};

import applicationException from '../service/applicationException';
import LineDAO from "../DAO/lineDAO";
import TransactionDAO from "../DAO/transactionDAO";
import UserTicketDAO from "../DAO/user/userTicketDAO";

function create(context) {


  async function rollbackTransaction(transactionId, ticketId) {
    try {
      await TransactionDAO.removeTransactionById(transactionId);
      await UserTicketDAO.removeTicketById(ticketId);

      return { message: `Transaction with ID ${transactionId} successfully rollback` };
    } catch (error) {
      throw applicationException.new(applicationException.BAD_REQUEST, 'Error while creating or updating relief');
    }
  }

  return {
    rollbackTransaction,
  };
}

export default {
  create: create
};

import applicationException from '../service/applicationException';
import LineDAO from "../DAO/lineDAO";
import TransactionDAO from "../DAO/transactionDAO";
import UserTicketDAO from "../DAO/user/userTicketDAO";
import TopUpDAO from "../DAO/topUpDAO";

function create(context) {


  async function rollbackTransaction(transactionId, ticketId) {

    try {
      await TransactionDAO.removeTransactionById(transactionId);
      await UserTicketDAO.removeUserTicketById(ticketId);

      return { message: `Transaction with ID ${transactionId} successfully rollback` };
    } catch (error) {
      throw applicationException.new(applicationException.BAD_REQUEST, 'Error while creating or updating relief');
    }
  }

  async function rollbackTopUp(topUpId) {
    try {
      await TopUpDAO.removeTopUpById(topUpId);

      return { message: `TopUp with ID ${topUpId} successfully rollback` };
    } catch (error) {
      throw applicationException.new(applicationException.BAD_REQUEST, 'Error while creating or updating relief');
    }
  }

  return {
    rollbackTransaction,
    rollbackTopUp,
  };
}

export default {
  create: create
};

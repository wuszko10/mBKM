import UserDAO from '../DAO/user/userDAO';
import applicationException from '../service/applicationException';
import TicketDAO from "../DAO/ticketDAO";
import PurchaseDAO from "../DAO/transactionDAO";
import TransactionDAO from "../DAO/transactionDAO";
import {getMetadataNames, transactionMappingIdsToNames} from "../service/transactionManager.service";
import UserTicketDAO from "../DAO/user/userTicketDAO";
import TopUpDAO from "../DAO/topUpDAO";
import mongoConverter from "../service/mongoConverter";
import ReliefDAO from "../DAO/reliefDAO";

function create(context) {


    async function createNewTransaction(transactionData, ticketData) {

        let ticket;

        const transaction = await TransactionDAO.createNewOrUpdateTransaction(transactionData);

        if (!transaction) {
            throw applicationException.new(applicationException.BAD_REQUEST, 'Transaction does not created');
        }

        ticketData.transactionId = transaction._id;

        ticket = await UserTicketDAO.createNewOrUpdateUserTicket(ticketData);

        if (!ticket) {
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

    async function getAndSearchTransaction(queryPage, queryPageSize, searchQuery) {

        const users = await UserDAO.getAll();
        const tickets = await UserTicketDAO.getAllUserTickets();

        const searchCriteria = transactionMappingIdsToNames(users, tickets, searchQuery);

        try {
            const {
                data, page, pageSize, totalPages, totalRecords,
            } = await TransactionDAO.getAndSearchTransaction(queryPage, queryPageSize, searchCriteria);

            const transactions = getMetadataNames(data, tickets, users)

            return {
                data: transactions, page, pageSize, totalPages, totalRecords,
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

        const transaction = await TransactionDAO.getTransactionById(id);
        const userTicket = await UserTicketDAO.getUserTicketByTransactionId(transaction.id);
        const ticket = await TicketDAO.getTicket(userTicket.ticketId);
        const relief = await ReliefDAO.getReliefById(userTicket.reliefId);
        const user = await UserDAO.get(transaction.userId);

        if (!transaction || !ticket || !userTicket || !relief || !user) throw applicationException.new(applicationException.BAD_REQUEST, `Transaction with ID ${id} not found`);

        return {
            transaction: transaction,
            userTicket: userTicket,
            ticket: ticket,
            relief: relief,
            user:user,
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

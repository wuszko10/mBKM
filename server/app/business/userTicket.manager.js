import applicationException from '../service/applicationException';
import UserTicketDAO from "../DAO/user/userTicketDAO";
import TicketDAO from "../DAO/ticketDAO";
import TicketPeriodDAO from "../DAO/metadata/ticketPeriodDAO";
import TransactionDAO from "../DAO/transactionDAO";
import {addTime} from "../service/userTicket.service";

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

    async function getDashboardUserTicketByUserId(id) {

        let tickets = [];
        let toValidate = [];
        let filteredToValidate = [];

        try {
            tickets = await TicketDAO.getAllTickets();
            toValidate = await UserTicketDAO.getUserTicketToValidateByUserId(id);

            filteredToValidate = toValidate.filter((item) => {
                const ticketType = tickets.find(type => type._id.toString() === item.ticketId.toString());
                return ticketType?.type.toString() === "674dd1b74e3d87c99c967256";
            });

            const active = await UserTicketDAO.getUserTicketValidatedByUserId(id);

            return {
                active: active,
                toValidate: filteredToValidate
            }

        } catch (error) {
            throw applicationException.new(applicationException.NOT_FOUND, `Ticket with ID ${id} not found`);
        }
    }

    async function getUserTicketById(id) {
      try {
          const userTicket = await UserTicketDAO.getUserTicketById(id);
          const transaction = await TransactionDAO.getTransactionById(userTicket.transactionId);
          return {
              userTicket: userTicket,
              transaction: transaction,
          }
      } catch (error) {
        throw applicationException.new(applicationException.NOT_FOUND, `Ticket with ID ${id} not found`);
      }
    }

    async function validateUserTicket(id) {

        const userTicket = await UserTicketDAO.getUserTicketById(id);
        const ticketType = await TicketDAO.getTicket(userTicket.ticketId);
        const period = await TicketPeriodDAO.getTicketPeriodById(ticketType.period);

        const startTime = Date.now();

        const endTime = addTime(startTime, period.period);

        userTicket.statusId = '675c1ca31c33663091557e95';
        userTicket.ticketStartDate = new Date(startTime).toISOString();
        userTicket.ticketEndDate = new Date(endTime).toISOString();

        console.log(userTicket);

        return await UserTicketDAO.createNewOrUpdateUserTicket(userTicket);
    }


    return {
        createNewOrUpdateUserTicket,
        getUserTicketByUserId,
        getDashboardUserTicketByUserId,
        getUserTicketById,
        validateUserTicket
    };
}

export default {
    create,
};

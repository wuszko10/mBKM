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

    async function validateUserTicket(id) {
        const ticket = await UserTicketDAO.findOne({_id: id});

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

    function addTime(dateString, unit) {
        let currentTimestamp = Date.now();

        let timestamp = dateString.replace(/(getTime\(\))|(getMonth\(\))|(setFullYear\(\))|(\+\d+)|(-\d+)/g, (match) => {
            if (match === 'getTime()') {
                return currentTimestamp;
            } else if (match === 'getMonth()') {
                const regex = /\d+/g;
                let number = parseInt(dateString.match(regex));
                let date = new Date(currentTimestamp);
                date.setMonth(date.getMonth() + number);
                return date.getTime();
            }

            return match;
        });

        let date = new Date(eval(timestamp));

        return date.getTime();
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

import TokenDAO from "../DAO/user/tokenDAO";
const cron = require('node-cron');
import TicketStatusTypeDAO from "../DAO/metadata/ticketStatusTypeDAO";
import UserTicketDAO from '../DAO/user/userTicketDAO'


async function updateTicketStatuses() {
    const now = new Date();

    const currentStatus = await TicketStatusTypeDAO.getStatusByName('valid');
    const invalidStatus = await TicketStatusTypeDAO.getStatusByName('expired');

    await UserTicketDAO.updateManyUserTickets(now, currentStatus, invalidStatus);
}

async function deleteExpiredTokens() {
    await TokenDAO.deleteExpiredTokens();
}

// Cron tasks
function startCronJobs() {

    console.info("Running updateTicketStatuses at server start...");
    updateTicketStatuses();
    deleteExpiredTokens();

    cron.schedule('*/15 6-9,13-16 * * *', updateTicketStatuses);

    cron.schedule('*/30 5-6,9-13,16-23 * * *', updateTicketStatuses);

    cron.schedule('0 23-5 * * *', updateTicketStatuses);

    cron.schedule('0 * * * *', deleteExpiredTokens);

    console.info("Cron jobs started");
}

module.exports = { startCronJobs };

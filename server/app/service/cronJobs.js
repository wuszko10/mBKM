const cron = require('node-cron');
const TicketStatusTypeDAO = require("../DAO/metadata/ticketStatusTypeDAO");
const UserTicketDAO = require("../DAO/user/userTicketDAO");


async function updateTicketStatuses() {
    const now = new Date();
    const currentStatus = await TicketStatusTypeDAO.getStatusByName('Validated');
    const invalidStatus = await  TicketStatusTypeDAO.getStatusByName('Expired');

    const result = await UserTicketDAO.updateManyUserTickets(now, currentStatus, invalidStatus);
    console.log(`Updated ${result.nModified} expired tickets at`, now);
}

// Cron tasks
function startCronJobs() {

    cron.schedule('*/15 6-9,13-16 * * *', updateTicketStatuses);

    cron.schedule('*/30 5-6,9-13,16-23 * * *', updateTicketStatuses);

    cron.schedule('0 23-5 * * *', updateTicketStatuses);

    console.info("Cron jobs started");
}

module.exports = { startCronJobs };

import TopUpDAO from "../DAO/topUpDAO";
import businessContainer from "../business/business.container";
import TicketStatusTypeDAO from "../DAO/metadata/ticketStatusTypeDAO";
import UserTicketDAO from '../DAO/user/userTicketDAO'
import TransactionDAO from "../DAO/transactionDAO";
import TokenDAO from "../DAO/user/tokenDAO";

const cron = require('node-cron');

async function updateTicketStatuses() {
    const now = new Date();

    const currentStatus = await TicketStatusTypeDAO.getStatusByName('valid');
    const invalidStatus = await TicketStatusTypeDAO.getStatusByName('expired');

    await UserTicketDAO.updateManyUserTickets(now, currentStatus, invalidStatus);
}

async function deleteExpiredTokens() {
    await TokenDAO.deleteExpiredTokens();
}


async function deleteInvalidTransactionsAndTopUps() {
    await TransactionDAO.deleteInvalidTransactions();
    await TopUpDAO.deleteInvalidTopUps();
}

// Cron tasks
function startCronJobs() {

    console.info("Running updateTicketStatuses at server start...");
    updateTicketStatuses().then();
    deleteExpiredTokens().then();
    deleteInvalidTransactionsAndTopUps().then();

    cron.schedule('*/15 6-9,13-16 * * *', updateTicketStatuses);

    cron.schedule('*/30 5-6,9-13,16-23 * * *', updateTicketStatuses);

    cron.schedule('0 23-5 * * *', updateTicketStatuses);

    cron.schedule('0 * * * *', deleteExpiredTokens);
    cron.schedule('0 * * * *', deleteInvalidTransactionsAndTopUps);

    console.info("Cron jobs started");
}

module.exports = { startCronJobs };

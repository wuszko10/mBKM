import TransactionDAO from "../DAO/transactionDAO";
import UserTicketDAO from "../DAO/user/userTicketDAO";
import WalletDAO from "../DAO/user/walletDAO";
import UserDAO from "../DAO/user/userDAO";
import applicationException from "../service/applicationException";
import TicketTypeDAO from "../DAO/metadata/ticketTypeDAO";
import TicketPeriodDAO from "../DAO/metadata/ticketPeriodDAO";
import TicketLineDAO from "../DAO/metadata/ticketLineDAO";
import ReliefTypeDAO from "../DAO/metadata/reliefTypeDAO";
import PaymentMethodDAO from "../DAO/payment/paymentMethodDAO";
import TicketStatusTypeDAO from "../DAO/metadata/ticketStatusTypeDAO";

function create() {

    async function getDashboardStats(days){

        try {
            const transactions = await TransactionDAO.getLastTransaction(days);
            const userTickets = await UserTicketDAO.getLastUserTickets(days);
            const usersTotalAmount = await WalletDAO.walletTotalAmount();
            const activeUsers = await UserDAO.countActiveUsers();

            return {
                transactions: transactions,
                userTickets: userTickets,
                usersTotalAmount: usersTotalAmount,
                activeUsers: activeUsers,
            }
        } catch {
            throw applicationException.new(applicationException.NOT_FOUND, 'Data not found');
        }

    }

    async function loadMetadataToCache(cache) {

        try {
            const ticketTypes = await TicketTypeDAO.get();
            const ticketPeriods = await TicketPeriodDAO.get();
            const ticketLines = await TicketLineDAO.get();
            const reliefTypes = await ReliefTypeDAO.get();
            const paymentMethods = await PaymentMethodDAO.get();
            const statusTypes = await TicketStatusTypeDAO.get();

            cache.set("ticketTypes", ticketTypes);
            cache.set("ticketPeriods", ticketPeriods);
            cache.set("ticketLines", ticketLines);
            cache.set("reliefTypes", reliefTypes);
            cache.set("paymentMethods", paymentMethods);
            cache.set("statusTypes", statusTypes);

        } catch (err) {
            console.error('Error loading metadata:', err);
            throw applicationException.new(applicationException.NOT_FOUND, 'Error loading metadata.');
        }
    }

    return {
        getDashboardStats,
        loadMetadataToCache
    }

}


export default {
    create: create
};

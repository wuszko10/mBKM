import TransactionDAO from "../DAO/transactionDAO";
import UserTicketDAO from "../DAO/user/userTicketDAO";
import WalletDAO from "../DAO/user/walletDAO";
import UserDAO from "../DAO/user/userDAO";
import applicationException from "../service/applicationException";

function create(context) {

    async function getDashboardStats(days){

        try {
            const transactions = await TransactionDAO.getLastTransaction(days);
            const userTickets = await UserTicketDAO.getLastUserTickets(days);
            const usersTotalAmount = await WalletDAO.walletTotalAmount();
            const activeUsers = await UserDAO.countActiveUsers();

            console.log(transactions);
            console.log(userTickets);
            console.log(usersTotalAmount);
            console.log(activeUsers);

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


    return {
        getDashboardStats,
    }

}

export default {
    create: create
};

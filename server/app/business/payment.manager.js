import applicationException from '../service/applicationException';
import ReliefDAO from "../DAO/reliefDAO";
import WalletDAO from "../DAO/user/walletDAO";
import TransactionDAO from "../DAO/transactionDAO";
import TopUpDAO from "../DAO/topUpDAO";
import TicketDAO from "../DAO/ticketDAO";
import UserTicketDAO from "../DAO/user/userTicketDAO";
import * as _ from "lodash";
import mongoConverter from "../service/mongoConverter";


const authorizationCodes = [
    {
        code: '123456',
        status: 'completed'
    },
    {
        code: '132435',
        status: 'completed'
    },
    {
        code: '654321',
        status: 'completed'
    },
]

const creditCards = [
    {
        cardNumber: "1234123412341234",
        expirationDate: "10/26",
        cvv: "123",
        status: "completed"
    },
    {
        cardNumber: "4321432143214321",
        expirationDate: "09/23",
        cvv: "321",
        status: "invalid"
    }
];

function create(context) {

    function generateReferenceId() {
        const timestamp = Date.now().toString(36);
        const randomPart = Math.random().toString(36).substring(2, 8);
        return `${timestamp}-${randomPart}`;
    }

    function findAuthorizationCode(code) {
        return authorizationCodes.find(
            (authCode) =>
                authCode.code === code
        );
    }

    function findCreditCard(cardNumber, expirationDate, cvv) {
        return creditCards.find(
            (card) =>
                card.cardNumber === cardNumber &&
                card.expirationDate === expirationDate &&
                card.cvv === cvv
        );
    }

    async function transactionInvalidError(transaction, userTicketId) {
        const ticket = await UserTicketDAO.getUserTicketById(userTicketId);
        await UserTicketDAO.removeTicketById(ticket._id);

        transaction.referenceId = generateReferenceId();
        transaction.status = 'invalid';
        await TransactionDAO.createNewOrUpdateTransaction(transaction);
    }

    async function topUpInvalidError(topUp) {

        topUp.referenceId = generateReferenceId();
        topUp.status = 'invalid';
        await TopUpDAO.createNewOrUpdateTopUp(topUp);
    }

    async function walletPayment(amount, transactionId, walletId, userTicketId) {

        let newAmount;

        const transaction = await TransactionDAO.getTransactionById(transactionId);
        const wallet = await WalletDAO.getWalletById(walletId);


        if (!wallet || !transaction) {
            throw applicationException.new(applicationException.BAD_REQUEST, 'Wallet or transaction for user does not exist');
        }

        if (wallet.amount < amount) {

            await transactionInvalidError(transaction, userTicketId);

            throw applicationException.new(applicationException.FORBIDDEN, 'Insufficient funds');
        }

        newAmount = wallet.amount - amount;
        wallet.amount = newAmount

        transaction.referenceId = generateReferenceId();
        transaction.status = 'completed';

        await TransactionDAO.createNewOrUpdateTransaction(transaction);
        const result = await WalletDAO.createNewOrUpdateWallet(wallet)

        return mongoConverter(result);
    }


    async function cardPaymentTransaction(amount, transactionId, cardNumber, expiryDate, cvv, userTicketId) {


        const transaction = await TransactionDAO.getTransactionById(transactionId);

        const card = findCreditCard(cardNumber, expiryDate, cvv);

        if (!transaction) {
            throw applicationException.new(applicationException.BAD_REQUEST, 'Transaction for does not exist');
        }

        if (!card) {
            const ticket = await UserTicketDAO.getUserTicketById(userTicketId);
            await UserTicketDAO.removeTicketById(ticket._id);
            await TransactionDAO.removeTransactionById(transaction._id);

            throw applicationException.new(applicationException.NOT_FOUND, 'Card does not exist');
        }

        if (card.status !== "completed") {

            await transactionInvalidError(transaction, userTicketId);

            throw applicationException.new(applicationException.VALIDATION_FAILURE, 'Card is not validate');
        }

        transaction.referenceId = generateReferenceId();
        transaction.status = card.status;

        return await TransactionDAO.createNewOrUpdateTransaction(transaction);
    }

    async function cardPaymentTopUp(amount, topUpId, cardNumber, expiryDate, cvv, walletId) {

        const topUp = await TopUpDAO.getTopUpById(topUpId);
        const card = findCreditCard(cardNumber, expiryDate, cvv);

        if (!topUp) {
            throw applicationException.new(applicationException.BAD_REQUEST, 'Top up for does not exist');
        }

        if (!card) {

            await TopUpDAO.removeTopUpById(topUp._id);

            throw applicationException.new(applicationException.NOT_FOUND, 'Card does not exist');
        }

        if (card.status !== "completed") {

            await topUpInvalidError(topUp)

            throw applicationException.new(applicationException.VALIDATION_FAILURE, 'Card is not validate');
        }

        topUp.referenceId = generateReferenceId();
        topUp.status = card.status;

        await TopUpDAO.createNewOrUpdateTopUp(topUp);

        return await WalletDAO.addAmountWallet(walletId, amount);
    }

    async function blikPaymentTransaction(amount, transactionId, code, userTicketId) {


        const transaction = await TransactionDAO.getTransactionById(transactionId);
        const authCode = findAuthorizationCode(code);

        if (!transaction) {
            throw applicationException.new(applicationException.BAD_REQUEST, 'Transaction for does not exist');
        }

        if (!authCode) {

            await transactionInvalidError(transaction, userTicketId);

            throw applicationException.new(applicationException.VALIDATION_FAILURE, "Invalid code");
        }

        transaction.referenceId = generateReferenceId();
        transaction.status = authCode.status;

        return await TransactionDAO.createNewOrUpdateTransaction(transaction);
    }

    async function blikPaymentTopUp(amount, topUpId, code, walletId) {
        const topUp = await TopUpDAO.getTopUpById(topUpId);
        const authCode = findAuthorizationCode(code);

        if (!topUp) {
            throw applicationException.new(applicationException.BAD_REQUEST, 'Transaction for does not exist');
        }

        if (!authCode) {

            await topUpInvalidError(topUp);

            throw applicationException.new(applicationException.BAD_REQUEST, "Invalid code details provided.");
        }

        topUp.referenceId = generateReferenceId();
        topUp.status = authCode.status;

        await TopUpDAO.createNewOrUpdateTopUp(topUp);

        return await WalletDAO.addAmountWallet(walletId, amount);
    }

    return {
        walletPayment: walletPayment,
        cardPaymentTransaction: cardPaymentTransaction,
        cardPaymentTopUp: cardPaymentTopUp,
        blikPaymentTransaction: blikPaymentTransaction,
        blikPaymentTopUp: blikPaymentTopUp,
    };
}

export default {

    create: create
};

import applicationException from '../service/applicationException';
import ReliefDAO from "../DAO/reliefDAO";
import WalletDAO from "../DAO/user/WalletDAO";
import TransactionDAO from "../DAO/transactionDAO";
import TopUpDAO from "../DAO/topUpDAO";


const authorizationCodes = {
  "123456": "completed",
  "654321": "invalid",
};

const creditCards = [
  {
    cardNumber: "1111222233334444",
    expirationDate: "10/26",
    cvv: "789",
    status: "completed"
  },
  {
    cardNumber: "4444333322221111",
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

  function findCreditCard(cardNumber, expirationDate, cvv) {
    return creditCards.find(
        (card) =>
            card.cardNumber === cardNumber &&
            card.expirationDate === expirationDate &&
            card.cvv === cvv
    );
  }

  function verifyAuthorizationCode(code) {
    if (authorizationCodes[code] === "completed") {
      return "completed";
    } else if (authorizationCodes[code] === "invalid") {
      return "invalid";
    } else {
      return "not recognized";
    }
  }
  async function walletPayment(data) {
    let newAmount;

    try {
      const wallet = await WalletDAO.getWalletByUserId(data.userId);
      const transaction = await TransactionDAO.getTransactionById(data.transactionId);

      if (!wallet || !transaction) {
        return new Error('Wallet or transaction for user does not exist');
      }

      if (wallet.amount < data.amount) {
        return new Error('Insufficient funds');
      }

      newAmount = wallet.amount - data.amount;

      transaction.referenceId = generateReferenceId();
      transaction.status = 'completed';

      await transaction.save();

      return await WalletDAO.createNewOrUpdateWallet({ userId: data.userId, amount: newAmount });
    } catch (error) {
      if (error.message === "Wallet or transaction for user does not exist") {
        throw applicationException.new(applicationException.UNAUTHORIZED, error.message);
      } else if ( error.message === "Insufficient funds"){
        throw applicationException.new(applicationException.METHOD_NOT_ALLOWED, error.message);
      } else {
        throw applicationException.new(applicationException.BAD_REQUEST, 'Error while processing payment');
      }
    }
  }


  async function cardPaymentTransaction(data){
    try {
      const transaction = await TransactionDAO.getTransactionById(data.transactionId);
      const card = findCreditCard(data.cardNumber, data.expiryDate, data.cvv);

      if (!transaction) {
        return new Error('Transaction for does not exist');
      }

      if (!card) {
        return new Error("Invalid card details provided.");
      }

      if (card.status !== "approved") {
        return new Error("Card is not approved for transactions.");
      }

      transaction.referenceId = generateReferenceId();
      transaction.status = card.status;

      return await transaction.save();
    } catch (error) {
      if (error.message === "Invalid card details provided.") {
        throw applicationException.new(applicationException.FORBIDDEN, error.message);
      } else if ( error.message === "Transaction for does not exist"){
        throw applicationException.new(applicationException.UNAUTHORIZED, error.message);
      } else {
        throw applicationException.new(applicationException.BAD_REQUEST, 'Error while processing payment');
      }
    }
  }

  async function cardPaymentTopUp(data){
    try {
      const topUp = await TopUpDAO.getTopUpById(data.transactionId);
      const card = findCreditCard(data.cardNumber, data.expiryDate, data.cvv);

      if (!topUp) {
        return new Error('Transaction for does not exist');
      }

      if (!card) {
        return new Error("Invalid card details provided.");
      }

      if (card.status !== "approved") {
        return new Error("Card is not approved for transactions.");
      }

      topUp.referenceId = generateReferenceId();
      topUp.status = card.status;

      return await topUp.save();
    } catch (error) {
      if (error.message === "Invalid card details provided.") {
        throw applicationException.new(applicationException.FORBIDDEN, error.message);
      } else if ( error.message === "Transaction for does not exist"){
        throw applicationException.new(applicationException.UNAUTHORIZED, error.message);
      } else {
        throw applicationException.new(applicationException.BAD_REQUEST, 'Error while processing payment');
      }
    }
  }

  async function blikPaymentTransaction(data){
    try {
      const transaction = await TransactionDAO.getTransactionById(data.transactionId);
      const status = verifyAuthorizationCode(data.code);

      if (!transaction) {
        return new Error('Transaction for does not exist');
      }

      if (status==="not recognized") {
        return new Error("Invalid code details provided.");
      }

      transaction.referenceId = generateReferenceId();
      transaction.status = status;

      return await transaction.save();
    } catch (error) {
      if (error.message === "Invalid code details provided.") {
        throw applicationException.new(applicationException.FORBIDDEN, error.message);
      } else if ( error.message === "Transaction for does not exist"){
        throw applicationException.new(applicationException.UNAUTHORIZED, error.message);
      } else {
        throw applicationException.new(applicationException.BAD_REQUEST, 'Error while processing payment');
      }
    }
  }

  async function blikPaymentTopUp(data){
    try {
      const topUp = await TopUpDAO.getTransactionById(data.transactionId);
      const status = verifyAuthorizationCode(data.code);

      if (!topUp) {
        return new Error('Transaction for does not exist');
      }

      if (status==="not recognized") {
        return new Error("Invalid code details provided.");
      }

      topUp.referenceId = generateReferenceId();
      topUp.status = status;

      return await topUp.save();
    } catch (error) {
      if (error.message === "Invalid code details provided.") {
        throw applicationException.new(applicationException.FORBIDDEN, error.message);
      } else if ( error.message === "Transaction for does not exist"){
        throw applicationException.new(applicationException.UNAUTHORIZED, error.message);
      } else {
        throw applicationException.new(applicationException.BAD_REQUEST, 'Error while processing payment');
      }
    }
  }

  return {
    walletPayment: walletPayment,
    cardPaymentTransaction:cardPaymentTransaction,
    cardPaymentTopUp: cardPaymentTopUp,
    blikPaymentTransaction: blikPaymentTransaction,
    blikPaymentTopUp: blikPaymentTopUp,
  };
}

export default {

  create: create
};

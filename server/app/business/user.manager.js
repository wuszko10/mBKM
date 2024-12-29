import PasswordDAO from '../DAO/user/passwordDAO';
import TokenDAO from '../DAO/user/tokenDAO';
import UserDAO from '../DAO/user/userDAO';
import applicationException from '../service/applicationException';
import sha1 from 'sha1';
import BusStopDAO from "../DAO/BusStopDAO";
import WalletDAO from "../DAO/user/walletDAO";
import UserTicketDAO from "../DAO/user/userTicketDAO";

function create(context) {

  function hashString(data) {
    return sha1(data);
  }

  async function authenticate(name, password) {
    let userData;
    const user = await UserDAO.getByEmailOrName(name);
    if (!user) {
      throw applicationException.new(applicationException.UNAUTHORIZED, 'User with that email does not exist');
    }
    userData = await user;
    await PasswordDAO.authorize(user.id, hashString(password));
    const wallet = await WalletDAO.getWalletByUserId(user.id);
    const token = await TokenDAO.create(userData);
    return {
      token: getToken(token),
      user: user,
      wallet: wallet,
    }
  }

  async function getAllUsers(page, pageSize, searchQuery) {
    try {
      return await UserDAO.getAndSearch(page, pageSize, searchQuery);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, 'Error while getting users');
    }
  }

  function getToken(token) {
    return {token: token.value};
  }

  async function createNewOrUpdate(userData) {

    let wallet;

    const user = await UserDAO.createNewOrUpdate(userData);
    wallet = { amount: 0, userId: user.id };

    await WalletDAO.createNewOrUpdateWallet(wallet);

    if (await userData.password) {
      return await PasswordDAO.createOrUpdate({userId: user.id, password: hashString(userData.password)});
    } else {
      return user;
    }
  }

  async function removeHashSession(userId, token) {
    return await TokenDAO.remove(userId, token);
  }

  async function getUserById(id) {
    try {
      return await UserDAO.get(id);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Ticket with ID ${id} not found`);
    }
  }

  return {
    authenticate: authenticate,
    getAllUsers: getAllUsers,
    createNewOrUpdate: createNewOrUpdate,
    removeHashSession: removeHashSession,
    getUserById: getUserById,
  };
}

export default {
  create: create
};

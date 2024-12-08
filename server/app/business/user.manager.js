import PasswordDAO from '../DAO/passwordDAO';
import TokenDAO from '../DAO/tokenDAO';
import UserDAO from '../DAO/userDAO';
import applicationException from '../service/applicationException';
import sha1 from 'sha1';
import BusStopDAO from "../DAO/BusStopDAO";

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
    const token = await TokenDAO.create(userData);
    return getToken(token);
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
    const user = await UserDAO.createNewOrUpdate(userData);
    if (await userData.password) {
      return await PasswordDAO.createOrUpdate({userId: user.id, password: hashString(userData.password)});
    }
    return user;
  }

  async function removeHashSession(userId) {
    return await TokenDAO.remove(userId);
  }

  return {
    authenticate: authenticate,
    getAllUsers: getAllUsers,
    createNewOrUpdate: createNewOrUpdate,
    removeHashSession: removeHashSession
  };
}

export default {
  create: create
};

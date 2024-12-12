import UserDAO from '../DAO/user/userDAO';
import applicationException from '../service/applicationException';
import TopUpDAO from "../DAO/topUpDAO";

function create(context) {


  async function createNewOrUpdateTopUp(data) {
    try {
      return await TopUpDAO.createNewOrUpdateTopUp(data);
    } catch (error) {
      throw applicationException.new(applicationException.BAD_REQUEST, 'Error while creating or updating top up');
    }
  }

  async function getAndSearchTopUp(page, pageSize, searchQuery) {

    const users = await UserDAO.getAll();

    try {
      return await TopUpDAO.getAndSearchTopUp(page, pageSize, searchQuery, users);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Top ups not found`);
    }
  }

  async function getTopUpsByUserId(id) {
    try {
      return await TopUpDAO.getTopUpsByUserId(id);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Top up with ID ${id} not found`);
    }
  }

  async function getTopUp(id) {
    try {
      return await TopUpDAO.getTopUp(id);
    } catch (error) {
      throw applicationException.new(applicationException.NOT_FOUND, `Top up with ID ${id} not found`);
    }
  }

  return {
    createNewOrUpdateTopUp: createNewOrUpdateTopUp,
    getAndSearchTopUp: getAndSearchTopUp,
    getTopUpsByUserId: getTopUpsByUserId,
    getTopUp: getTopUp
  };
}

export default {
  create: create
};

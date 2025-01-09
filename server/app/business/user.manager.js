import PasswordDAO from '../DAO/user/passwordDAO';
import TokenDAO from '../DAO/user/tokenDAO';
import UserDAO from '../DAO/user/userDAO';
import applicationException from '../service/applicationException';
import sha1 from 'sha1';
import WalletDAO from "../DAO/user/walletDAO";
import UserTicketDAO from "../DAO/user/userTicketDAO";
import TransactionDAO from "../DAO/transactionDAO";
import TopUpDAO from "../DAO/topUpDAO";
import UserAddressDAO from "../DAO/user/userAddressDAO";
import mongoConverter from "../service/mongoConverter";

function create() {

    function hashString(data) {
        return sha1(data);
    }

    async function authenticate(name, password) {
        const user = await UserDAO.getByEmailOrName(name);
        if (!user || !user.active) {
            throw applicationException.new(applicationException.BAD_REQUEST, 'User with that email does not exist');
        }

        const isAuthorized = await PasswordDAO.authorize(user.id, hashString(password));
        if (!isAuthorized) {
            throw applicationException.new(applicationException.BAD_REQUEST, 'Invalid password');
        }

        const [wallet, token, address] = await Promise.all([
            WalletDAO.getWalletByUserId(user.id),
            TokenDAO.create(user),
            UserAddressDAO.getAddressByUserId(user.id)
        ]);

        return {
            token: getToken(token),
            user,
            wallet,
            address,
        };
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

    async function createNewOrUpdate(userData, addressData) {

        if (!userData.id) {
            let wallet;

            const user = await UserDAO.createNewOrUpdate(userData);
            wallet = {amount: 0, userId: user.id};
            addressData.userId = user.id;

            await WalletDAO.createNewOrUpdateWallet(wallet);
            await UserAddressDAO.createNewOrUpdateAddress(addressData);

            if (await userData.password) {
                return await PasswordDAO.createOrUpdate({userId: user.id, password: hashString(userData.password)});
            } else {
                return user;
            }
        } else {
            return await UserDAO.createNewOrUpdate(userData);
        }

    }

    async function removeHashSession(userId, token) {
        return await TokenDAO.remove(userId, token);
    }

    async function getUserById(id) {

        try {
            const user = await UserDAO.get(id);
            const wallet = await WalletDAO.getWalletByUserId(id);
            const userTickets = await UserTicketDAO.countUserTicketsByUserId(id);
            const transactions = await TransactionDAO.countTransactionsByUserId(id);
            const address = await UserAddressDAO.getAddressByUserId(id);
            const topUps = await TopUpDAO.countTopUpsByUserId(id);
            const sessions = await TokenDAO.countTokensByUserId(id);

            return {
                user: user,
                wallet: wallet,
                userTickets: userTickets,
                transactions: transactions,
                address: address,
                topUps: topUps,
                sessions: sessions,
            }
        } catch (error) {
            throw applicationException.new(applicationException.NOT_FOUND, `User with ID ${id} not found`);
        }
    }

    async function updateAddress(addressData) {
        const result = await UserAddressDAO.createNewOrUpdateAddress(addressData);
        if(result){
            return mongoConverter(result);
        }
        throw applicationException.new(applicationException.NOT_FOUND, `User address with ID ${addressData.id} not found`);
    }

    async function checkResetPasswordByUserEmail(email, checkPesel) {

        const user = await UserDAO.getByEmailOrName(email);

        if (!user || !user.active) {
            throw applicationException.new(applicationException.BAD_REQUEST, 'User with that email does not exist');
        }

        let pesel = user.pesel;
        pesel = pesel.slice(-5);

        if (pesel === checkPesel) {
            return user;
        }
        throw applicationException.new(applicationException.VALIDATION_FAILURE, `PESEL for user with ID ${user.id} not found`);
    }

    async function resetPassword(email, oldPassword, newPassword) {

        const user = await UserDAO.getByEmailOrName(email);

        if (!user || !user.active) {
            throw applicationException.new(applicationException.BAD_REQUEST, 'User with that email does not exist');
        }

        const passwordData = await PasswordDAO.resetPassword(user.id, hashString(oldPassword));

        if (!passwordData) {
            throw applicationException.new(applicationException.VALIDATION_FAILURE, 'User with that email does not exist');
        }

        passwordData.password = hashString(newPassword);

        console.log(JSON.stringify(passwordData));

        return await PasswordDAO.createOrUpdate(passwordData);
    }

    async function restorePassword(email, newPassword) {

        const user = await UserDAO.getByEmailOrName(email);

        if (!user || !user.active) {
            throw applicationException.new(applicationException.BAD_REQUEST, 'User with that email does not exist');
        }

        const passwordData = await PasswordDAO.restorePassword(user.id);

        if (!passwordData) {
            throw applicationException.new(applicationException.VALIDATION_FAILURE, 'User with that email does not exist');
        }

        passwordData.password = hashString(newPassword);

        return await PasswordDAO.createOrUpdate(passwordData);
    }

    async function activateOrDeactivate(id) {

        console.log(id);

        const result = await UserDAO.get(id);

        if(!result){
            throw applicationException.new(applicationException.NOT_FOUND, `User with ID ${id} not found`);
        }

        result.active = !result.active;

        console.log(result);
        return await UserDAO.createNewOrUpdate(result);
    }

    return {
        authenticate: authenticate,
        getAllUsers: getAllUsers,
        createNewOrUpdate: createNewOrUpdate,
        removeHashSession: removeHashSession,
        getUserById: getUserById,
        updateAddress,
        activateOrDeactivateUser: activateOrDeactivate,
        checkResetPasswordByUserEmail,
        resetPassword,
        restorePassword,
    };
}

export default {
    create: create
};

import {
    loginModel,
    logoutModel,
    profileModel,
    miniProfileModel,
    registerModel
} from "../models/UserModel";

const registerController = async (data) => {
    const {
        firstName,
        lastName,
        userName,
        password
    } = data;

    if (!firstName || !lastName || !userName || !password) {
        return {
            message: 'All fields are required'
        }
    }

    const response = await registerModel(firstName, lastName, userName, password).then(res => res).catch(err => err);

    return response

}

const loginController = async (data) => {
    const {
        userName,
        password
    } = data;

    if (!userName || !password) {
        return {
            message: 'All fields are required'
        }
    }

    const response = await loginModel(userName, password).then(res => res).catch(err => err);

    return response;
}

const profileController = async () => {
    const response = await profileModel().then(res => res).catch(err => err);
    return response;
}

const miniProfileController = async () => {
    const response = await miniProfileModel().then(res => res).catch(err => err);
    return response;
}

const logoutController = async () => {
    const response = await logoutModel().then(res => res).catch(err => err);
    return response;
}

export {
    registerController,
    loginController,
    profileController,
    miniProfileController,
    logoutController
}
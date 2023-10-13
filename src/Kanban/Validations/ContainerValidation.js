import {
    createContainer,
    delateContainer,
    getAllContainers,
    updateContainer
} from "../APIs/ContainerAPI";

export const createContainerValidation = async (data) => {
    const {
        title
    } = data;

    if (!title) {
        return {
            message: 'All fields are required'
        }
    }

    return createContainer(title);

}

export const getAllContainerValidation = async () => {
    return getAllContainers();
}


export const updateContainerValidation = async (data) => {
    const {
        id,
        title
    } = data;

    if (!id || !title) {
        return {
            message: 'All fields are required'
        }
    }

    const response = await updateContainer(id, title);

    return response
}


export const deleteContainerValidation = async (id) => {
    if (!id) {
        return {
            message: "Id is required"
        };
    }

    const response = await delateContainer(id).then(res => res).catch(err => err);

    return response
}
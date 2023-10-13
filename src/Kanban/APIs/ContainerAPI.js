import axiosInstance from "./axiosInstance"

export const createContainer = (title) => {

    const data = {
        title
    }

    const apiCall = async () => {
        try {
            const response = await axiosInstance.post('/container', data);
            return response
        } catch (error) {
            return error
        }
    };

    return apiCall();

}

export const getAllContainers = () => {

    const apiCall = async () => {
        try {
            const response = await axiosInstance.get('/container');
            return response
        } catch (error) {
            return error
        }
    };

    return apiCall();

}

export const updateContainer = (id, title) => {
    const ipData = {
        title
    }


    const apiCall = async () => {
        try {
            const response = await axiosInstance.patch(`/container/${id}`, ipData);
            return response

        } catch (error) {
            return error
        }
    };

    return apiCall();


}

export const delateContainer = (id) => {
    const apiCall = async () => {
        try {
            const response = await axiosInstance.delete(`/container/${id}`);
            return response

        } catch (error) {
            return error
        }
    };

    return apiCall();
}
import axiosInstance from "./axiosInstance";

export const createTask = (columnId, content) => {
    const ipData = {
        columnId,
        content
    }
    const apiCall = async () => {
        try {
            const response = await axiosInstance.post(`/task`, ipData);
            return response

        } catch (error) {
            return error
        }
    };

    return apiCall();
}

export const getAllTask = () => {
    const apiCall = async () => {
        try {
            const response = await axiosInstance.get(`/task`);
            return response

        } catch (error) {
            return error
        }
    };

    return apiCall();
}

export const updateTask = (id, controllerId, title) => {
    const ipData = {
        id,
        controllerId,
        title
    }
    const apiCall = async () => {
        try {
            const response = await axiosInstance.patch(`/task/${id}`, ipData);
            return response

        } catch (error) {
            return error
        }
    };

    return apiCall();
}

export const deleteTask = (id) => {
    const apiCall = async () => {
        try {
            const response = await axiosInstance.delete(`/task/${id}`);
            return response

        } catch (error) {
            return error
        }
    };

    return apiCall();
}
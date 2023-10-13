import {
    createTask,
    deleteTask,
    getAllTask,
    updateTask
} from "../APIs/TaskAPI";

export const createTaskValidation = async (data) => {
    const {
        columnId,
        content
    } = data;

    console.log(data)
    if (!columnId || !content) {
        return {
            message: 'All fields are required'
        }
    } else {}
    return createTask(columnId, content)
}

export const getAllTaskValidation = () => {
    return getAllTask()
}

export const updateTaskValidation = (data) => {
    const {
        id,
        containerId,
        title
    } = data
    if (!id || !containerId || !title) {
        return {
            message: 'All fields are required'
        }
    }

    return updateTask(id, containerId, title).then(res => res).catch(err => err);
}

export const deleteTaskValidation = (id) => {
    if (!id) {
        return {
            message: "Id is missing"
        }
    }

    return deleteTask(id).then(res => res).catch(err => err);
}
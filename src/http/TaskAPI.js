import { $authHost } from "./index";

export const createTask = async (task) => {
    const { data } = await $authHost.post('api/v1/task', task)
    return data
}

export const fetchTasks = async () => {
    const { data } = await $authHost.get('api/v1/task')
    return data
}

export const fetchTaskById = async (id) => {
    const { data } = await $authHost.get('api/v1/task/' + id)
    return data
}

export const deleteTaskById = async (id) => {
    const { data } = await $authHost.delete('api/v1/task/' + id)
    return data
}

export const deleteTaskPointById = async (taskId, pointId) => {
    const { data } = await $authHost.delete('api/v1/task/' + taskId + '/' + pointId)
    return data
}
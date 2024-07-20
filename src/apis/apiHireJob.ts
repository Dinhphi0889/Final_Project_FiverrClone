import api from "./apiUtil";

export const apiHireJob = async (data:any) => {
    try {
        const response = await api.post('thue-cong-viec',data)
        return response.data.content
    } catch (error: any) {
        throw Error(error)
    }
}
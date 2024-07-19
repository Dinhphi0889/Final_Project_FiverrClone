import api from "./apiUtil";

export const apiGetJobHired = async () => {
    try {
        const response = await api.get('/thue-cong-viec/lay-danh-sach-da-thue')
        return response.data.content
    } catch (error: any) {
        throw Error(error)
    }
}
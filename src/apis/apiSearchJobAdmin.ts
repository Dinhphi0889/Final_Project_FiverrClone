import api from "./apiUtil";

export const apiSearchJobAdmin = async (value: any) => {
    try {
        const response = await api.get(`cong-viec/lay-danh-sach-cong-viec-theo-ten/${value}`)
        return response.data.content
    }
    catch (error: any) {
        throw Error(error)
    }
}
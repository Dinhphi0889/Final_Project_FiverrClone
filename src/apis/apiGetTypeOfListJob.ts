
import api from "./apiUtil";

export const apiGetDetailOfTypeJob = async (id: any) => {
    try {
        const response = await api.get(`cong-viec/lay-cong-viec-theo-chi-tiet-loai/${id}`)
        return response.data.content
    } catch (error: any) {
        throw Error(error)
    }
}
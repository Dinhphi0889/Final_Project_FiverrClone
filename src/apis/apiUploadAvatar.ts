import api from "./apiUtil";

export const apiUploadAvatar = async (data: any) => {
    try {
        const response = await api.post(`users/upload-avatar`, data)
        return response.data.content
    }
    catch (error: any) {
        throw Error(error)
    }
}
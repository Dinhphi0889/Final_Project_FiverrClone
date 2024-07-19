import api from "./apiUtil";

export const apiComments = async (comment: any) => {
    try {
        const response = api.post(`/binh-luan`, comment)
        return response
    }
    catch (error: any) {
        throw Error(error)
    }
}
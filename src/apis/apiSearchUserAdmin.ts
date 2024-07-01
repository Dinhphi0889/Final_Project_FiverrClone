import api from "./apiUtil";

export const apiSearchUserAdmin = async (values: any) => {
    try {
        const response = await api.get(`users/search/${values}`)
        return response.data.content
    }
    catch (error: any) {
        throw Error(error)
    }
}
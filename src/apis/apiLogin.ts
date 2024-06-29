import api from "./apiUtil";

export const apiLogin = async (data: {
    email: String,
    password: String,
}) => {
    try {
        const response = await api.post('auth/signin/', data)
        return response.data.content
    }
    catch (getError: any) {
        throw Error(getError)
    }
}
import { ResponseApi } from "../types/responseApi";
import { TypeUser } from "../types/typeUser";
import api from "./apiUtil";

export const apiEditUser = async (id: any, data: any) => {
    try {
        const response = await api.put<ResponseApi<TypeUser>>(`users/${id}`, data)

        // convert data
        const clone = response.data.content
        clone.skill = JSON.parse(clone.skill)
        clone.certification = JSON.parse(clone.certification)
        return clone

    } catch (error) {

    }
}
import { ResponseApi } from "../types/responseApi";
import { TypeUser } from "../types/typeUser";
import api from "./apiUtil";

export const apiGetUserAdmin = async (pageIndex: any, pageSize: any) => {
    try {
        const response = await api.get<ResponseApi<TypeUser>>(`users/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`)
        return response.data.content
    } catch (error: any) {
        throw Error(error)
    }

}
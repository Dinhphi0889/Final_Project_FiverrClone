import { ResponseApi } from "../types/responseApi";
import { CongViec } from "../types/typeDetailOfListJob";
import api from "./apiUtil";

export const apiEditJobAdmin = async (id: any, data: any) => {
    try {
        const response = await api.put<ResponseApi<CongViec>>(`cong-viec/${id}`, data)
        return response.data.content
    }
    catch (error: any) {
        throw Error(error)
    }
}
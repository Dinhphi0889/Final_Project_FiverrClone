import api from "./apiUtil";
import { TypeListJob } from "../types/typeListJob";
import { ResponseApi } from "../types/responseApi";

export const apiGetListJob = async (id: any) => {
    try {
        const response = await api.get<ResponseApi<TypeListJob>>(`cong-viec/lay-chi-tiet-loai-cong-viec/${id}`)
        return response.data.content
    }
    catch (error: any) {
        return Error(error)
    }
}
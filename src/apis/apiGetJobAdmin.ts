import { ResponseApi } from "../types/responseApi";
import { congViec } from "../types/typeNameJob";
import api from "./apiUtil";

export const apiGetJobAdmin = async (pageIndex: any, pageSize: any) => {
    try {
        const response = await api.get<ResponseApi<congViec>>(`cong-viec/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`)
        return response.data.content
    }
    catch (error: any) {
        throw Error(error)
    }
}
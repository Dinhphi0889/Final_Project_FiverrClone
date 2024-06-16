
import { ResponseApi } from "../types/responseApi"
import { TypeNameJob } from "../types/typeNameJob"
import api from "./apiUtil"

export const apiGetNameJob = async (name: any) => {
    try {
        const response = await api.get<ResponseApi<TypeNameJob>>(`cong-viec/lay-danh-sach-cong-viec-theo-ten/${name}`)
        return response.data.content
    }
    catch (error: any) {
        throw Error(error)
    }
}

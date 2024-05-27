import { useAppDispatch } from "../redux/hooks"
import { ResponseApi } from "../types/responseApi"
import { MenuJob } from "../types/typeMenuJob"
import api from "./apiUtil"

export const getMenuJob = async () => {
    try {
        const response = await api.get<ResponseApi<MenuJob[]>>('cong-viec/lay-menu-loai-cong-viec')
        return response.data.content
    }
    catch (error: any) {
        throw Error(error)
    }
}
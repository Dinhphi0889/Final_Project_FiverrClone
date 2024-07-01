import api from "./apiUtil";

export const apiGetDataPagination = async (url: any, pageIndex: any, pageSize: any) => {
    try {
        const response = await api.get(`${url}/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`)
        return response.data.content
    }
    catch (error: any) {
        throw Error(error)
    }
}
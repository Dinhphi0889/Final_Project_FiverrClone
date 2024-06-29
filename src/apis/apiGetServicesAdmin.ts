import api from "./apiUtil";

export const apiGetServicesAdmin = async (pageIndex: any, pageSize: any) => {
    try {
        const response = await api.get(`thue-cong-viec/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`)
        return response.data.content
    } catch (error: any) {
        throw Error(error);

    }
}
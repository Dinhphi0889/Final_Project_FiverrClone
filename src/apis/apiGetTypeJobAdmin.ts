import api from "./apiUtil";

export const apiGetTypeJobAmin = async (
  pageIndex: any,
  pageSize: any,
  searchTerm = ""
) => {
  try {
    const response = await api.get(
      `loai-cong-viec/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&searchTerm=${searchTerm}`
    );
    console.log(response.data);
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
};

export const apiAddTypeJob = async (jobType: { tenLoaiCongViec: string }) => {
  try {
    const response = await api.post(`loai-cong-viec`, jobType);
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const apiDeleteTypeJob = async (id: number) => {
  try {
    const response = await api.delete(`loai-cong-viec/${id}`);
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const apiEditTypeJob = async (
  id: number,
  jobType: { tenLoaiCongViec: string }
) => {
  try {
    const response = await api.put(`loai-cong-viec/${id}`, jobType);
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};

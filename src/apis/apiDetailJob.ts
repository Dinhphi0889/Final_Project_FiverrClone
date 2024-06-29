import { NewComment, TypeDetailjob } from "../types/detailJob";
import { ResponseApi } from "../types/responseApi";
import api from "./apiUtil";

export const getBannerDetailJob = async (): Promise<
  TypeDetailjob[`content`]
> => {
  try {
    const result = await api.get<TypeDetailjob>(
      "/cong-viec/lay-cong-viec-chi-tiet/1"
    );
    // console.log("abc", result.data.content);

    return result.data.content;
  } catch (error: any) {
    throw Error(error);
  }
};

export const postComment = async (newComment: NewComment) => {
  try {
    const response = await api.post("/binh-luan", newComment);
    console.log(response);
    return response.data; // hoặc xử lý kết quả trả về từ server
  } catch (error) {
    throw new Error("Đã xảy ra lỗi khi đăng bình luận.");
  }
};

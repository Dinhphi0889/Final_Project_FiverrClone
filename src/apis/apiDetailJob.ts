import api from "./apiUtil";

export const getBannerDetailJob = async () => {
  try {
    const response = await api.get("");
  } catch (error: any) {
    throw Error(error);
  }
};

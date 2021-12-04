import axios from "axios";
import router from "@/router";
import { updateAuthUser } from "@/utils/store";

export const logout = async (
  method = "post",
  path = "/logout"
): Promise<void> => {
  try {
    await axios[method](path);
  } catch (error) {
    if (!axios.isAxiosError(error) || error.response.status !== 401) return;
    console.log(error);
  }
  updateAuthUser({
    username: "",
    nickname: "",
  });
  router.replace("/login");
};

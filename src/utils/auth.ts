import axios from "axios";
import router from "@/router";
import { updateAuthUser } from "@/utils/store";

export const logout = async (
  method = "post",
  path = "/logout"
): Promise<void> => {
  await axios[method](path).catch((error) => {
    if (error.response.status !== 401) return;
    console.log(error);
  });
  updateAuthUser({
    username: "",
    nickname: "",
  });
  router.replace("/login");
};

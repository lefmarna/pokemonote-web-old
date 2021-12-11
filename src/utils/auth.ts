import axios from "axios";
import router from "@/router";
import { notice, updateAuthUser } from "@/utils/store";
import { Login } from "@/types";

export const login = async (
  params: FormData | Login,
  method = "post",
  path = "/login"
): Promise<void> => {
  const response = await axios[method](path, params);
  updateAuthUser(response.data.data);
  router.push("/");
  notice();
};

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

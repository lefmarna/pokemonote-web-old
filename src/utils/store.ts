import { computed } from "@vue/composition-api";
import store from "@/store";
import { User } from "@/types/index";

export const authUserName = computed((): string => {
  return store.getters.authUser.username;
});

export const updateAuthUser = (user: User): void => {
  store.commit("updateAuthUser", user);
};

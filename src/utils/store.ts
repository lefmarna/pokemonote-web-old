import { computed } from "@vue/composition-api";
import store from "@/store";
import { Ranking, User } from "@/types/index";

export const authUserName = computed((): string => {
  return store.getters.authUser.username;
});

export const notice = (): void => {
  store.commit("updateNotice", true);
  setTimeout(() => {
    store.commit("updateNotice", false);
  }, 2250);
};

export const updateAuthUser = (user: User): void => {
  store.commit("updateAuthUser", user);
};

export const updateRanking = (ranking: Ranking[]): void => {
  store.commit("updateRanking", ranking);
};

import { computed } from "@vue/composition-api";
import store from "@/store";
import { Nature, PokemonData, Ranking, Stat, User } from "@/types/index";

export const authUser = computed(() => {
  return store.getters.authUser;
});

export const authUserName = computed((): string => {
  return store.getters.authUser.username;
});

export const currentNature = computed({
  get: (): Nature => {
    return store.getters.currentNature;
  },
  set(value): void {
    store.commit("updateCurrentNature", value);
  },
});

export const currentPokemon = computed({
  get: (): PokemonData => {
    return store.getters.currentPokemon;
  },
  set(value): void {
    store.commit("updateCurrentPokemon", value);
  },
});

export const lv = computed({
  get(): number | null {
    return store.getters.lv;
  },
  set(value: number | null) {
    store.commit("updateLv", value);
  },
});

export const natureData = computed((): Nature[] => {
  return store.getters.natureData;
});

export const notice = (): void => {
  store.commit("updateNotice", true);
  setTimeout(() => {
    store.commit("updateNotice", false);
  }, 2250);
};

export const pokemonData = computed((): PokemonData[] => {
  return store.getters.pokemonData;
});

export const stats = computed((): Stat[] => {
  return store.getters.stats;
});

export const updateAuthUser = (user: User): void => {
  store.commit("updateAuthUser", user);
};

export const updateRanking = (ranking: Ranking[]): void => {
  store.commit("updateRanking", ranking);
};

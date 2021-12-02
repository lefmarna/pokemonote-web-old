<template>
  <div>
    <!-- ポケモン名 -->
    <SearchField
      :items="pokemonData"
      label="ポケモン名"
      itemName="ポケモン"
      :clearable="true"
      :selectItem="currentPokemon"
      @update="$emit('updatePokemon', $event)"
    />
    <v-row>
      <!-- レベル -->
      <v-col cols="4">
        <LvField :lv="lv" @update="$emit('updateLv', $event)" />
      </v-col>
      <!-- 性格 -->
      <v-col cols="8">
        <SearchField
          :items="natureData"
          label="性格"
          itemName="性格"
          :selectItem="currentNature"
          @update="$emit('updateNature', $event)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "@vue/composition-api";
import SearchField from "@/components/molecules/SearchField.vue";
import LvField from "@/components/organisms/LvField.vue";
import { Pokemon } from "@/types/pokemon";
import { Nature } from "@/types/nature";
import store from "@/store";

export default defineComponent({
  components: {
    SearchField,
    LvField,
  },
  props: {
    currentPokemon: {
      type: Object as PropType<Pokemon>,
      required: false,
      default: () => Object,
    },
    currentNature: {
      type: Object as PropType<Nature>,
      required: false,
      default: () => Object,
    },
    lv: {
      // String型を許可しないと null のとき怒られる
      type: [Number, String],
      required: false,
      default: "",
    },
  },
  setup() {
    const pokemonData = computed((): Pokemon[] => {
      return store.getters.pokemonData;
    });
    const natureData = computed((): Nature[] => {
      return store.getters.natureData;
    });
    return {
      pokemonData,
      natureData,
    };
  },
});
</script>

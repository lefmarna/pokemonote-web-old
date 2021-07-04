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
import Vue from "vue";
import SearchField from "@/components/molecules/SearchField.vue";
import LvField from "@/components/organisms/LvField.vue";
import { Pokemon } from "@/types/pokemon";
import { Nature } from "@/types/nature";

export default Vue.extend({
  components: {
    SearchField,
    LvField,
  },
  computed: {
    pokemonData(): Pokemon[] {
      return this.$store.getters.pokemonData;
    },
    natureData(): Nature[] {
      return this.$store.getters.natureData;
    },
  },
  props: {
    currentPokemon: {
      type: Object as Vue.PropType<Pokemon>,
    },
    currentNature: {
      type: Object as Vue.PropType<Nature>,
    },
    lv: {
      // String型を許可しないと null のとき怒られる
      type: [Number, String],
      default: "",
    },
  },
});
</script>

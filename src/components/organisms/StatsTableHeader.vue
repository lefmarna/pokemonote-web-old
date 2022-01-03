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
import { defineComponent, PropType } from "@vue/composition-api";
import { SearchField } from "@/components/molecules";
import LvField from "@/components/organisms/LvField.vue";
import { Nature, PokemonData } from "@/types/index";
import { natureData, pokemonData } from "@/utils/store";

export default defineComponent({
  components: {
    SearchField,
    LvField,
  },
  props: {
    currentPokemon: {
      type: Object as PropType<PokemonData>,
      required: false,
      default: () => Object,
    },
    currentNature: {
      type: Object as PropType<Nature>,
      required: false,
      default: () => Object,
    },
    lv: {
      type: Number,
      required: false,
      default: null,
    },
  },
  setup() {
    return {
      pokemonData,
      natureData,
    };
  },
});
</script>

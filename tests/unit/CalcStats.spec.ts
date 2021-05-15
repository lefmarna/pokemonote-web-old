import { shallowMount, createLocalVue } from "@vue/test-utils";
import CalcStats from "@/components/templates/CalcStats.vue";
import Vuex from "vuex";
import store from "@/store";
import Vuetify from "vuetify";
import { Pokemon } from "@/types/pokemon";
import { Nature } from "@/types/nature";
import { Stat } from "@/types/stat";

describe("CalcButtonの正常系テスト", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  // propsで渡すデータを用意
  const currentPokemon: Pokemon = {
    no: 682,
    name: "シュシュプ",
    form: "",
    ranks: [],
    evolutions: [683],
    types: ["フェアリー"],
    abilities: ["いやしのこころ"],
    hiddenAbilities: ["アロマベール"],
    stats: {
      hp: 78,
      attack: 52,
      defence: 60,
      spAttack: 63,
      spDefence: 65,
      speed: 23,
    },
  };
  const currentNature: Nature = {
    name: "おだやか",
    stats: {
      hp: 1.0,
      attack: 0.9,
      defence: 1.0,
      spAttack: 1.0,
      spDefence: 1.1,
      speed: 1.0,
    },
  };
  const lv: number | null = 50;
  const stats: Stat[] = [
    {
      en: "hp",
      ja: "ＨＰ",
      abbreviation: "H",
      individualValue: 25,
      effortValue: null,
    },
    {
      en: "attack",
      ja: "こうげき",
      abbreviation: "A",
      individualValue: 15,
      effortValue: 20,
    },
    {
      en: "defence",
      ja: "ぼうぎょ",
      abbreviation: "B",
      individualValue: 5,
      effortValue: 40,
    },
    {
      en: "spAttack",
      ja: "とくこう",
      abbreviation: "C",
      individualValue: 30,
      effortValue: 60,
    },
    {
      en: "spDefence",
      ja: "とくぼう",
      abbreviation: "D",
      individualValue: 20,
      effortValue: 80,
    },
    {
      en: "speed",
      ja: "すばやさ",
      abbreviation: "S",
      individualValue: 10,
      effortValue: 100,
    },
  ];

  let wrapper: any;

  // Vuetify固有の記述
  let vuetify: any;

  beforeEach(() => {
    vuetify = new Vuetify();

    wrapper = shallowMount(CalcStats, {
      store,
      localVue,
      vuetify,
      propsData: {
        currentPokemon,
        currentNature,
        lv,
        stats,
      },
    });
  });

  it("propsが渡せていること", () => {
    expect(wrapper.vm.currentPokemon).toBe(currentPokemon);
    expect(wrapper.vm.currentNature).toBe(currentNature);
    // await wrapper.setProps({ lv: 100 });
    // await console.log(wrapper.vm.lv);
    expect(wrapper.vm.lv).toBe(lv);
    expect(wrapper.vm.stats).toBe(stats);
  });

  it("実数値が正しく反映されていること", () => {
    expect(wrapper.vm.hp).toBe(150);
    expect(wrapper.vm.attack).toBe(60);
    expect(wrapper.vm.defence).toBe(72);
    expect(wrapper.vm.spAttack).toBe(90);
    expect(wrapper.vm.spDefence).toBe(99);
    expect(wrapper.vm.speed).toBe(45);
  });

  it("ステータスの合計値が正しく反映されていること", () => {
    expect(wrapper.vm.totalBaseStats).toBe(341);
    expect(wrapper.vm.totalIv).toBe(105);
    expect(wrapper.vm.totalEv).toBe(300);
    expect(wrapper.vm.totalStats).toBe(516);
  });

  it("耐久指数が正しく反映されていること", () => {
    expect(wrapper.html()).toContain("総合：25650");
    expect(wrapper.html()).toContain("物理：10800");
    expect(wrapper.html()).toContain("特殊：14850");
  });

  it("めざパが正しく反映されていること", () => {
    expect(wrapper.html()).toContain("めざパ：ひこう");
  });
});

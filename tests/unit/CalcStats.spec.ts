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

  it("「ＨＰ」の実数値を変更したとき、各種値が正しく更新されること", async () => {
    await wrapper.setData({ hp: 160 });
    // 個体値
    expect(wrapper.vm.stats[0].individualValue).toBe(25);
    expect(wrapper.vm.stats[1].individualValue).toBe(15);
    expect(wrapper.vm.stats[2].individualValue).toBe(5);
    expect(wrapper.vm.stats[3].individualValue).toBe(30);
    expect(wrapper.vm.stats[4].individualValue).toBe(20);
    expect(wrapper.vm.stats[5].individualValue).toBe(10);
    // 努力値
    expect(wrapper.vm.stats[0].effortValue).toBe(76);
    expect(wrapper.vm.stats[1].effortValue).toBe(20);
    expect(wrapper.vm.stats[2].effortValue).toBe(40);
    expect(wrapper.vm.stats[3].effortValue).toBe(60);
    expect(wrapper.vm.stats[4].effortValue).toBe(80);
    expect(wrapper.vm.stats[5].effortValue).toBe(100);
    // ステータスの合計
    expect(wrapper.vm.totalBaseStats).toBe(341);
    expect(wrapper.vm.totalIv).toBe(105);
    expect(wrapper.vm.totalEv).toBe(376);
    expect(wrapper.vm.totalStats).toBe(526);
    // 耐久指数
    expect(wrapper.html()).toContain("総合：27360");
    expect(wrapper.html()).toContain("物理：11520");
    expect(wrapper.html()).toContain("特殊：15840");
    // その他
    expect(wrapper.html()).toContain("めざパ：ひこう");
  });

  it("「こうげき」の実数値を変更したとき、各種値が正しく更新されること", async () => {
    await wrapper.setData({ attack: 70 });
    // 個体値
    expect(wrapper.vm.stats[0].individualValue).toBe(25);
    expect(wrapper.vm.stats[1].individualValue).toBe(15);
    expect(wrapper.vm.stats[2].individualValue).toBe(5);
    expect(wrapper.vm.stats[3].individualValue).toBe(30);
    expect(wrapper.vm.stats[4].individualValue).toBe(20);
    expect(wrapper.vm.stats[5].individualValue).toBe(10);
    // 努力値
    expect(wrapper.vm.stats[0].effortValue).toBe(76);
    expect(wrapper.vm.stats[1].effortValue).toBe(108);
    expect(wrapper.vm.stats[2].effortValue).toBe(40);
    expect(wrapper.vm.stats[3].effortValue).toBe(60);
    expect(wrapper.vm.stats[4].effortValue).toBe(80);
    expect(wrapper.vm.stats[5].effortValue).toBe(100);
    // ステータスの合計
    expect(wrapper.vm.totalBaseStats).toBe(341);
    expect(wrapper.vm.totalIv).toBe(105);
    expect(wrapper.vm.totalEv).toBe(464);
    expect(wrapper.vm.totalStats).toBe(536);
    // 耐久指数
    expect(wrapper.html()).toContain("総合：27360");
    expect(wrapper.html()).toContain("物理：11520");
    expect(wrapper.html()).toContain("特殊：15840");
    // その他
    expect(wrapper.html()).toContain("めざパ：ひこう");
  });

  it("「ぼうぎょ」の実数値を変更したとき、各種値が正しく更新されること", async () => {
    await wrapper.setData({ defence: 70 });
    // 個体値
    expect(wrapper.vm.stats[0].individualValue).toBe(25);
    expect(wrapper.vm.stats[1].individualValue).toBe(15);
    expect(wrapper.vm.stats[2].individualValue).toBe(5);
    expect(wrapper.vm.stats[3].individualValue).toBe(30);
    expect(wrapper.vm.stats[4].individualValue).toBe(20);
    expect(wrapper.vm.stats[5].individualValue).toBe(10);
    // 努力値
    expect(wrapper.vm.stats[0].effortValue).toBe(76);
    expect(wrapper.vm.stats[1].effortValue).toBe(108);
    expect(wrapper.vm.stats[2].effortValue).toBe(20);
    expect(wrapper.vm.stats[3].effortValue).toBe(60);
    expect(wrapper.vm.stats[4].effortValue).toBe(80);
    expect(wrapper.vm.stats[5].effortValue).toBe(100);
    // ステータスの合計
    expect(wrapper.vm.totalBaseStats).toBe(341);
    expect(wrapper.vm.totalIv).toBe(105);
    expect(wrapper.vm.totalEv).toBe(444);
    expect(wrapper.vm.totalStats).toBe(534);
    // 耐久指数
    expect(wrapper.html()).toContain("総合：27040");
    expect(wrapper.html()).toContain("物理：11200");
    expect(wrapper.html()).toContain("特殊：15840");
    // その他
    expect(wrapper.html()).toContain("めざパ：ひこう");
  });

  it("「とくこう」の実数値を変更したとき、各種値が正しく更新されること", async () => {
    await wrapper.setData({ spAttack: 85 });
    // 個体値
    expect(wrapper.vm.stats[0].individualValue).toBe(25);
    expect(wrapper.vm.stats[1].individualValue).toBe(15);
    expect(wrapper.vm.stats[2].individualValue).toBe(5);
    expect(wrapper.vm.stats[3].individualValue).toBe(30);
    expect(wrapper.vm.stats[4].individualValue).toBe(20);
    expect(wrapper.vm.stats[5].individualValue).toBe(10);
    // 努力値
    expect(wrapper.vm.stats[0].effortValue).toBe(76);
    expect(wrapper.vm.stats[1].effortValue).toBe(108);
    expect(wrapper.vm.stats[2].effortValue).toBe(20);
    expect(wrapper.vm.stats[3].effortValue).toBe(16);
    expect(wrapper.vm.stats[4].effortValue).toBe(80);
    expect(wrapper.vm.stats[5].effortValue).toBe(100);
    // ステータスの合計
    expect(wrapper.vm.totalBaseStats).toBe(341);
    expect(wrapper.vm.totalIv).toBe(105);
    expect(wrapper.vm.totalEv).toBe(400);
    expect(wrapper.vm.totalStats).toBe(529);
    // 耐久指数
    expect(wrapper.html()).toContain("総合：27040");
    expect(wrapper.html()).toContain("物理：11200");
    expect(wrapper.html()).toContain("特殊：15840");
    // その他
    expect(wrapper.html()).toContain("めざパ：ひこう");
  });

  it("「とくぼう」の実数値を変更したとき、各種値が正しく更新されること", async () => {
    await wrapper.setData({ spDefence: 105 });
    // 個体値
    expect(wrapper.vm.stats[0].individualValue).toBe(25);
    expect(wrapper.vm.stats[1].individualValue).toBe(15);
    expect(wrapper.vm.stats[2].individualValue).toBe(5);
    expect(wrapper.vm.stats[3].individualValue).toBe(30);
    expect(wrapper.vm.stats[4].individualValue).toBe(20);
    expect(wrapper.vm.stats[5].individualValue).toBe(10);
    // 努力値
    expect(wrapper.vm.stats[0].effortValue).toBe(76);
    expect(wrapper.vm.stats[1].effortValue).toBe(108);
    expect(wrapper.vm.stats[2].effortValue).toBe(20);
    expect(wrapper.vm.stats[3].effortValue).toBe(16);
    expect(wrapper.vm.stats[4].effortValue).toBe(128);
    expect(wrapper.vm.stats[5].effortValue).toBe(100);
    // ステータスの合計
    expect(wrapper.vm.totalBaseStats).toBe(341);
    expect(wrapper.vm.totalIv).toBe(105);
    expect(wrapper.vm.totalEv).toBe(448);
    expect(wrapper.vm.totalStats).toBe(535);
    // 耐久指数
    expect(wrapper.html()).toContain("総合：28000");
    expect(wrapper.html()).toContain("物理：11200");
    expect(wrapper.html()).toContain("特殊：16800");
    // その他
    expect(wrapper.html()).toContain("めざパ：ひこう");
  });

  it("「すばやさ」の実数値を変更したとき、各種値が正しく更新されること", async () => {
    await wrapper.setData({ speed: 39 });
    // 個体値
    expect(wrapper.vm.stats[0].individualValue).toBe(25);
    expect(wrapper.vm.stats[1].individualValue).toBe(15);
    expect(wrapper.vm.stats[2].individualValue).toBe(5);
    expect(wrapper.vm.stats[3].individualValue).toBe(30);
    expect(wrapper.vm.stats[4].individualValue).toBe(20);
    expect(wrapper.vm.stats[5].individualValue).toBe(10);
    // 努力値
    expect(wrapper.vm.stats[0].effortValue).toBe(76);
    expect(wrapper.vm.stats[1].effortValue).toBe(108);
    expect(wrapper.vm.stats[2].effortValue).toBe(20);
    expect(wrapper.vm.stats[3].effortValue).toBe(16);
    expect(wrapper.vm.stats[4].effortValue).toBe(128);
    expect(wrapper.vm.stats[5].effortValue).toBe(48);
    // ステータスの合計
    expect(wrapper.vm.totalBaseStats).toBe(341);
    expect(wrapper.vm.totalIv).toBe(105);
    expect(wrapper.vm.totalEv).toBe(396);
    expect(wrapper.vm.totalStats).toBe(529);
    // 耐久指数
    expect(wrapper.html()).toContain("総合：28000");
    expect(wrapper.html()).toContain("物理：11200");
    expect(wrapper.html()).toContain("特殊：16800");
    // その他
    expect(wrapper.html()).toContain("めざパ：ひこう");
  });
});

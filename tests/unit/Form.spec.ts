import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import FormTemplate from "@/components/templates/FormTemplate.vue";

// localVueを使ってComposition APIを有効にする
const localVue = createLocalVue();
localVue.use(VueCompositionApi);

describe("CalcButtonの正常系テスト", () => {
  it("propsの値が正しいこと", () => {
    const title = "タイトル";
    const buttonText = "ボタン";
    const errors = ["エラー1", "エラー2", "エラー3"];
    const wrapper = shallowMount(FormTemplate, {
      localVue,
      propsData: {
        title: title,
        buttonText: buttonText,
        errors: errors,
      },
    });
    expect(wrapper.props().title).toBe(title);
    expect(wrapper.props().buttonText).toBe(buttonText);
    expect(wrapper.props().errors).toBe(errors);
  });
});

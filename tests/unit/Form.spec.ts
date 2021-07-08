import { mount } from "@vue/test-utils";
import { shallowMount } from "@vue/test-utils";
import Form from "@/components/templates/Form.vue";

describe("CalcButtonの正常系テスト", () => {
  it("タイトルを表示する", () => {
    const title = "タイトル";
    const wrapper = mount(Form, {
      propsData: { title },
    });
    expect(wrapper.text()).toBe(`Pokemonote - ${title}`);
  });

  it("ボタンを表示する", () => {
    const buttonText = "ボタン";
    const wrapper = mount(Form, {
      propsData: { buttonText },
    });
    expect(wrapper.find("button").text()).toBe(buttonText);
  });

  it("エラーメッセージを表示する", () => {
    const errors = ["エラー1", "エラー2", "エラー3"];
    const wrapper = shallowMount(Form, {
      propsData: { errors },
    });
    errors.map((error) => {
      expect(wrapper.text()).toContain(error);
    });
  });
});

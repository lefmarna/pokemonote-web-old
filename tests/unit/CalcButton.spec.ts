import { shallowMount } from "@vue/test-utils";
import CalcButton from "@/components/CalcButton.vue";

describe("CalcButtonの正常系テスト", () => {
  it("テキストがstring型ならpropsを受け取れる", () => {
    const buttonText: string = "テスト";
    const wrapper = shallowMount(CalcButton, {
      propsData: { buttonText },
    });
    expect(wrapper.text()).toBe(buttonText);
  });
});

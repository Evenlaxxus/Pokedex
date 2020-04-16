import { shallowMount } from "@vue/test-utils";
import BasicInfo from "@/components/BasicInfo.vue";

describe("BasicInfo.vue", () => {
  it("get correct propse", () => {
    const id = 1;
    const weight = 69;
    const height = 11;
    const wrapper = shallowMount(BasicInfo, {
      propsData: { id, weight, height }
    });
    expect(wrapper.html()).toContain(1 && 69 && 11);
  });
});

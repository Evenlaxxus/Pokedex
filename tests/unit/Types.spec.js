import { shallowMount } from "@vue/test-utils";
import Types from "@/components/Types.vue";

describe("Types.vue", () => {
  it("sets color to type", () => {
    const types = ["fire"];
    const wrapper = shallowMount(Types, {
      propsData: { types }
    });
    expect(wrapper.html()).toContain("fire" && 'color="red"');
  });
});

import { shallowMount } from "@vue/test-utils";
import Moves from "@/components/Moves.vue";

describe("Abilities.vue", () => {
  it("get correct props", () => {
    const move = {
      name: "Dodge",
      type: "normal",
      effect: "Pokemon dodge's stuff."
    };
    const wrapper = shallowMount(Moves, {
      propsData: { move }
    });
    expect(wrapper.html()).toContain(
      "Dodge" && "normal" && "Pokemon dodge's stuff."
    );
  });
});

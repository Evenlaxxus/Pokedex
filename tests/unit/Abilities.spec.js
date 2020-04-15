import { shallowMount } from "@vue/test-utils";
import Abilities from "@/components/Abilities.vue";

describe("Abilities.vue", () => {
  it("get correct props", () => {
    const ability = { name: "Punch", effect: "This ability hit stuff." };
    const wrapper = shallowMount(Abilities, {
      propsData: { ability }
    });
    expect(wrapper.html()).toContain("Punch" && "This ability hit stuff.");
  });
});

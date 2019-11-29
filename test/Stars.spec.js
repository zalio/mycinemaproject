import { shallowMount } from "@vue/test-utils";
import Stars from "@/pages/Stars.vue";

describe('Stars.vue', () => {
  it('renders a list of class which is "starCard"', () => {
    const stars = wrapper.findAll('.starCard');
    const anyStar = wrapper.findAll(".starCard").at(1);
    anyStar.trigger("follow");
    const nextStepStar = wrapper.findAll(".starCard");
    expect(stars.length - nextStepStars.length).toEqual(1);
  })
});

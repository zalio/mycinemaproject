import { shallowMount } from "@vue/test-utils";
import Recommendeds from "@/pages/Recommendeds.vue";

describe('Recommendeds.vue', () => {
  it('renders a list of class which is "movieCard"', () => {
    const movies = wrapper.findAll('.movieCard');
    const anyMovie = wrapper.findAll(".movieCard").at(1);
    anyMovie.trigger("follow");
    const nextStepMovies = wrapper.findAll(".movieCard");
    expect(movies.length - nextStepMovies.length).toEqual(1);
  })
});

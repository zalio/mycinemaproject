import { shallowMount } from "@vue/test-utils";
import Homepage from "@/pages/Homepage.vue";

describe('Homepage.vue', () => {
  it('renders a list of class which is "movieCard"', () => {
    const movies = wrapper.findAll('.movieCard');
    const anyMovie = wrapper.findAll(".movieCard").at(1);
    anyMovie.trigger("follow");
    const nextStepMovies = wrapper.findAll(".movieCard");
    expect(movies.length - nextStepMovies.length).toEqual(1);
  })
});

import { shallowMount } from "@vue/test-utils";
import Genres from "@/pages/Genres.vue";

describe('Genres.vue', () => {
  it('renders a list of class which is "genreCard"', () => {
    const genres = wrapper.findAll('.genreCard');
    const anyGenre = wrapper.findAll(".genreCard").at(1);
    anyGenre.trigger("follow");
    const nextStepGenres = wrapper.findAll(".genreCard");
    expect(genres.length - nextStepGenres.length).toEqual(1);
  })
});

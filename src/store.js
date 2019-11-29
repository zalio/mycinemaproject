import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";
import { router } from "./router";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: "",
    userId: "",
    fbApiKey: "AIzaSyBip3V3Q6_-h6zC7o3CaeklOGgOX6VYA60",
    theMovieDBKey: "b729eac929fe71fc2dadee306339052a",
    movies: [],
    genres: [],
    stars: [],
    followedMovies: [],
    followedGenres: [],
    followedStars: [],
    recommendeds: []
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = "";
    },
    setUserId(state, id) {
      state.userId = id;
    },
    clearUserId(state) {
      state.userId = "";
    },
    clearFolloweds(state) {
      state.followedMovies = [];
      state.followedGenres = [];
      state.followedStars = [];
    },
    clearRecommendeds(state) {
      state.recommendeds = [];
    }
  },
  actions: {
    initAuth({ commit, dispatch }) {
      let token = localStorage.getItem("token");
      let localId = localStorage.getItem("localId");
      if (token) {
        commit("setToken", token);
        commit("setUserId", localId);
        router.push("/");
        commit("clearFolloweds");
        dispatch("getMoviesOfUser");
        dispatch("getGenresOfUser");
        dispatch("getStarsOfUser");
        let expirationDate = localStorage.getItem("expiresInDate");
        let time = new Date().getTime();
        if (time >= +expirationDate) {
          dispatch("logout");
        } else {
          commit("setToken", token);
          commit("setUserId", localId);
          let timerSecond = +expirationDate - time;
          dispatch("expiresInTimer", timerSecond);
          router.push("/");
        }
      } else {
        router.push("/auth");
        return false;
      }
    },
    login({ commit, dispatch, state }, authData) {
      let authLink =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
      if (authData.isUser) {
        authLink =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
      }
      return axios
        .post(authLink + state.fbApiKey, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(response => {
          commit("setToken", response.data.idToken);
          commit("setUserId", response.data.localId);

          localStorage.setItem("token", response.data.idToken);
          localStorage.setItem("localId", response.data.localId);
          dispatch("getMoviesOfUser");
          dispatch("getGenresOfUser");
          dispatch("getStarsOfUser");
          localStorage.setItem(
            "expiresInDate",
            new Date().getTime() + +response.data.expiresIn * 1000
          );
          dispatch("expiresInTimer", +response.data.expiresIn * 1000);
          return true;
        })
        .catch(() => {
          return false;
        });
    },
    logout({ commit, state }) {
      commit("clearToken");
      commit("clearUserId");
      commit("clearFolloweds");
      localStorage.removeItem("token");
      localStorage.removeItem("localId");
      localStorage.removeItem("expiresInDate");
      router.replace("/auth");
      return state.token === "";
    },
    expiresInTimer({ dispatch }, expiresIn) {
      setTimeout(() => {
        dispatch("logout");
      }, expiresIn);
    },
    changepassword({ state }, changepasswdData) {
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBip3V3Q6_-h6zC7o3CaeklOGgOX6VYA60",
          {
            idToken: state.token,
            password: changepasswdData.password,
            returnSecureToken: true
          }
        )
        .then(response => {
          return response.status === 200;
        })
        .catch(() => {
          return false;
        });
    },
    getMovies({ state }) {
      for (let i = 1; i < 5; i++) {
        axios
          .get(
            "https://api.themoviedb.org/3/movie/top_rated?api_key=b729eac929fe71fc2dadee306339052a&language=en-US&page=" +
              i.toString()
          )
          .then(response => {
            let size = response.data.results.length;
            for (let j = 0; j < size; j++) {
              let flag = false;
              let followedMovies = state.followedMovies;
              for (let movie in followedMovies) {
                if (followedMovies[movie].id === response.data.results[j].id) {
                  flag = true;
                }
              }
              if (!flag) {
                state.movies.push(response.data.results[j]);
              }
            }
          });
      }
    },
    getGenres({ state }) {
      axios
        .get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=b729eac929fe71fc2dadee306339052a&language=en-US"
        )
        .then(response => {
          let size = response.data.genres.length;
          for (let j = 0; j < size; j++) {
            state.genres.push(response.data.genres[j]);
          }
        });
    },
    getStars({ state }) {
      for (let i = 1; i < 5; i++) {
        axios
          .get(
            "https://api.themoviedb.org/3/person/popular?api_key=b729eac929fe71fc2dadee306339052a&language=en-US&page=" +
              i.toString()
          )
          .then(response => {
            let size = response.data.results.length;
            for (let j = 0; j < size; j++) {
              state.stars.push(response.data.results[j]);
            }
          });
      }
    },
    addMovie({ state }, data) {
      let movies = state.followedMovies;
      let flag = false;
      for (let movie in movies) {
        if (movies[movie].id === data.movieId) {
          flag = true;
        }
      }
      if (!flag) {
        axios
          .get(
            "https://api.themoviedb.org/3/movie/" +
              data.movieId.toString() +
              "?api_key=b729eac929fe71fc2dadee306339052a&language=en-US"
          )
          .then(response => {
            state.followedMovies.push(response.data);
            if (data.isrecommended) {
              let movies = state.recommendeds;
              for (let movie in movies) {
                if (movies[movie].id === data.movieId) {
                  state.recommendeds.splice(movie, 1);
                }
              }
            } else {
              let movies = state.movies;
              for (let movie in movies) {
                if (movies[movie].id === data.movieId) {
                  state.movies.splice(movie, 1);
                }
              }
            }
          });
        axios.post(
          "https://vuejsauthentication-9170e.firebaseio.com/movies.json",
          { username: state.userId, movieId: data.movieId }
        );
        return true;
      } else {
        return false;
      }
    },
    getMoviesOfUser({ state }) {
      axios
        .get("https://vuejsauthentication-9170e.firebaseio.com/movies.json")
        .then(response => {
          let data = response.data;
          for (let key in data) {
            let receivedMovie = data[key];
            if (receivedMovie.username === state.userId) {
              axios
                .get(
                  "https://api.themoviedb.org/3/movie/" +
                    receivedMovie.movieId.toString() +
                    "?api_key=b729eac929fe71fc2dadee306339052a&language=en-US"
                )
                .then(response => {
                  state.followedMovies.push(response.data);
                });
            }
          }
        });
    },
    addGenre({ state }, data) {
      let genres = state.followedGenres;
      let flag = false;
      for (let genre in genres) {
        if (genres[genre].id === data.genreId) {
          flag = true;
        }
      }
      if (!flag) {
        genres = state.genres;
        for (let genre in genres) {
          if (genres[genre].id === data.genreId) {
            state.followedGenres.push(genres[genre]);
            state.genres.splice(genre, 1);
          }
        }
        axios.post(
          "https://vuejsauthentication-9170e.firebaseio.com/genres.json",
          { username: state.userId, genreId: data.genreId }
        );
        return true;
      } else {
        return false;
      }
    },
    getGenresOfUser({ state }) {
      axios
        .get("https://vuejsauthentication-9170e.firebaseio.com/genres.json")
        .then(response => {
          let data = response.data;
          let genres;
          axios
            .get(
              "https://api.themoviedb.org/3/genre/movie/list?api_key=b729eac929fe71fc2dadee306339052a&language=en-US"
            )
            .then(response => {
              genres = response.data.genres;
            })
            .then(() => {
              for (let key in data) {
                let receivedGenre = data[key];
                if (receivedGenre.username === state.userId) {
                  for (let genre in genres) {
                    let tempGenre = genres[genre];
                    if (tempGenre.id === receivedGenre.genreId) {
                      state.followedGenres.push(tempGenre);
                    }
                  }
                }
              }
              return true;
            });
        });
      return false;
    },
    addStar({ state }, data) {
      let stars = state.followedStars;
      let flag = false;
      for (let star in stars) {
        if (stars[star].id === data.starId) {
          flag = true;
        }
      }
      if (!flag) {
        stars = state.stars;
        for (let star in stars) {
          if (stars[star].id === data.starId) {
            state.followedStars.push(stars[star]);
            state.stars.splice(star, 1);
          }
        }
        axios.post(
          "https://vuejsauthentication-9170e.firebaseio.com/stars.json",
          {
            username: state.userId,
            starId: data.starId
          }
        );
        return true;
      } else {
        return false;
      }
    },
    getStarsOfUser({ state }) {
      axios
        .get("https://vuejsauthentication-9170e.firebaseio.com/stars.json")
        .then(response => {
          let data = response.data;
          for (let key in data) {
            let receivedStar = data[key];
            if (receivedStar.username === state.userId) {
              axios
                .get(
                  "https://api.themoviedb.org/3/person/" +
                    receivedStar.starId.toString() +
                    "?api_key=b729eac929fe71fc2dadee306339052a&language=en-US"
                )
                .then(response => {
                  state.followedStars.push(response.data);
                });
            }
          }
          return true;
        });
      return false;
    },
    deleteMovie({ state }, data) {
      let movieDb = "";
      axios
        .get("https://vuejsauthentication-9170e.firebaseio.com/movies.json")
        .then(response => {
          let movies = response.data;
          for (let result in movies) {
            if (movies[result].movieId === data.movieId) {
              movieDb = result;
            }
          }
        })
        .then(() => {
          axios
            .delete(
              "https://vuejsauthentication-9170e.firebaseio.com/movies/" +
                movieDb +
                ".json"
            )
            .then(response => {
              if (response.status === 200) {
                let movies = state.followedMovies;
                for (let movie in movies) {
                  if (movies[movie].id === data.movieId) {
                    state.followedMovies.splice(movie, 1);
                  }
                }
              }
            });
        });
      return movieDb === "";
    },
    deleteGenre({ state }, data) {
      let genreDb = "";
      axios
        .get("https://vuejsauthentication-9170e.firebaseio.com/genres.json")
        .then(response => {
          let genres = response.data;
          for (let result in genres) {
            if (genres[result].genreId === data.genreId) {
              genreDb = result;
            }
          }
        })
        .then(() => {
          axios
            .delete(
              "https://vuejsauthentication-9170e.firebaseio.com/genres/" +
                genreDb +
                ".json"
            )
            .then(response => {
              if (response.status === 200) {
                let genres = state.followedGenres;
                for (let genre in genres) {
                  if (genres[genre].id === data.genreId) {
                    state.followedGenres.splice(genre, 1);
                  }
                }
              }
            });
        });
      return genreDb === "";
    },
    deleteStar({ state }, data) {
      let starDb = "";
      axios
        .get("https://vuejsauthentication-9170e.firebaseio.com/stars.json")
        .then(response => {
          let stars = response.data;
          for (let result in stars) {
            if (stars[result].starId === data.starId) {
              starDb = result;
            }
          }
        })
        .then(() => {
          axios
            .delete(
              "https://vuejsauthentication-9170e.firebaseio.com/stars/" +
                starDb +
                ".json"
            )
            .then(response => {
              if (response.status === 200) {
                let stars = state.followedStars;
                for (let star in stars) {
                  if (stars[star].id === data.starId) {
                    state.followedStars.splice(star, 1);
                  }
                }
              }
            });
        });
      return starDb === "";
    },
    getRecommends({ state }, data) {
      axios
        .get(
          "https://api.themoviedb.org/3/discover/movie?api_key=b729eac929fe71fc2dadee306339052a&language=en-US&include_adult=false&with_people=" +
            data.starIds +
            "&with_genres=" +
            data.genreIds
        )
        .then(response => {
          let results = response.data.results;
          for (let result in results) {
            let flag = false;
            let recommendeds = state.recommendeds;
            for (let recommend in recommendeds) {
              if (recommend.id === results[result].id) {
                flag = true;
              }
            }
            if (!flag) {
              flag = false;
              let followedMovies = state.followedMovies;
              for (let movie in followedMovies) {
                if (results[result].id === followedMovies[movie].id) {
                  flag = true;
                }
              }
              if (!flag) {
                state.recommendeds.push(results[result]);
              } else {
                return false;
              }
            }
          }
        });
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.token !== "";
    },
    getMovies(state) {
      return state.movies;
    },
    getGenres(state) {
      return state.genres;
    },
    getStars(state) {
      return state.stars;
    },
    getFollowedMovies(state) {
      return state.followedMovies;
    },
    getFollowedGenres(state) {
      return state.followedGenres;
    },
    getFollowedStars(state) {
      return state.followedStars;
    },
    getRecommendeds(state) {
      return state.recommendeds;
    }
  }
});
export default store;

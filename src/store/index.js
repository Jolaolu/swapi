import Vue from "vue";
import Vuex from "vuex";
import { spliceData } from "@/utils/helpers";
import http from "@/utils/service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    characters: [],
    planets: [],
    starships: [],
    loading: true,
    toast: {
      message: "",
      context: "",
      show: false
    },
    currentPage: 1,
    pageDetails: {
      to: null,
      from: 1,
      perPage: 20,
      totalPages: null,
      viewedPages: null
    }
  },
  mutations: {
    setCharacters(state, characters) {
      state.characters = characters;
    },
    setStarships(state, starships) {
      state.starships = starships;
    },
    setPlanets(state, planets) {
      state.planets = planets;
    },
    Loading(state, bool) {
      state.loading = bool;
    },
    Toast(state, payload) {
      state.toast = { ...payload };
    },
    pageData(state, payload) {
      state.pageData = { ...payload };
    },
    currentPage(state, payload) {
      state.currentPage += payload;
    },
    setTotalData(state, payload) {
      state.pageDetails.totalData = payload;
    },
    setTotalPages(state, payload) {
      state.pageDetails.totalPages = payload;
    }
  },
  getters: {
    isLoading: state => state.loading,
    characters: state => state.characters,
    starships: state => state.starships,
    planets: state => state.planets,
    toast: state => state.toast,
    page: state => state.currentPage,
    pageDetails: state => state.pageDetails
  },
  actions: {
    showToast({ commit }, { message, context }) {
      commit("Toast", { message: message, context: context, show: true });
      setTimeout(() => {
        commit("Toast", { message: " ", context: " ", show: false });
      }, 3000);
    },
    async fetchPopularData({ commit, dispatch }) {
      await Promise.all([
        http.get("/people/"),
        http.get("/starships/"),
        http.get("/planets/")
      ])
        .then(response => {
          const [characters, starships, planets] = response;

          const popularCharacters = characters.data.results;
          const popularStarships = starships.data.results;
          const popularPlanets = planets.data.results;
          console.log(response);
          console.log(popularCharacters, popularStarships, popularPlanets);
          // strip out unwanted data and reduce response to first 6 objects

          spliceData(popularCharacters, 4);
          spliceData(popularStarships, 6);
          spliceData(popularPlanets, 9);

          commit("setCharacters", popularCharacters);
          commit("setStarships", popularStarships);
          commit("setPlanets", popularPlanets);

          commit("Loading", false);
        })
        .catch(response => {
          const message = response;
          dispatch("showToast", { message: message, context: "error" });
        });
    },
    async searchPopularData({ commit, dispatch }, searchItem) {
      commit("Loading", true);
      try {
        await Promise.all([
          await http.get(`/character/?name=${searchItem}`),
          await http.get(`/location/?name=${searchItem}`),
          await http.get(`/episode/?name=${searchItem}`)
        ]).then(response => {
          const [characters, locations, episodes] = response;
          const popularCharacters = characters.data.results;
          const popularLocations = locations.data.results;
          const popularEpisodes = episodes.data.results;

          dispatch("showToast", {
            message: "Results found",
            context: "success"
          });

          // strip out unwanted data and reduce response to first 6 objects

          spliceData(popularCharacters);
          spliceData(popularLocations);
          spliceData(popularEpisodes);

          commit("Characters", popularCharacters);
          commit("Locations", popularLocations);
          commit("Episodes", popularEpisodes);

          commit("Loading", false);
        });
      } catch (error) {
        const message = error;
        dispatch("showToast", { message: message, context: "error" });
      }
    }
  }
});

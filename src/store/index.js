import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { spliceData, capitalizeItem, reconstructObject } from "@/utils/helpers";
import http from "@/utils/service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    people: [],
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
    setPeople(state, people) {
      state.people = people;
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
    people: state => state.people,
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
          const [people, starships, planets] = response;

          const popularPeople = people.data.results;
          const popularStarships = starships.data.results;
          const popularPlanets = planets.data.results;
          const data = [];
          data.push(
            reconstructObject(popularPeople),
            reconstructObject(popularStarships),
            reconstructObject(popularPlanets)
          );
          return data;
        })
        .then(data => {
          const [people, starships, planets] = data;

          const popularPeople = people;
          const popularStarships = starships;
          const popularPlanets = planets;

          // strip out unwanted data and reduce response to first 6 objects

          spliceData(popularPeople, 4);
          spliceData(popularStarships, 6);
          spliceData(popularPlanets, 9);

          commit("setPeople", popularPeople);
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
          await http.get(`/people/?search=${searchItem}`),
          await http.get(`/starships/?search=${searchItem}`),
          await http.get(`/planets/?search=${searchItem}`)
        ])
          .then(response => {
            const [people, starships, planets] = response;

            const popularPeople = people.data.results;
            const popularStarships = starships.data.results;
            const popularPlanets = planets.data.results;
            const data = [];
            data.push(
              reconstructObject(popularPlanets),
              reconstructObject(popularPeople),
              reconstructObject(popularStarships)
            );
            return data;
          })
          .then(response => {
            const [people, starships, planets] = response;
            const popularPeople = people;
            const popularStarships = starships;
            const popularPlanets = planets;

            if (
              people.data.count === 0 &&
              starships.data.count === 0 &&
              planets.data.count === 0
            ) {
              dispatch("showToast", {
                message: "Results not found",
                context: "error"
              });
            } else {
              dispatch("showToast", {
                message: "Results found",
                context: "success"
              });
            }

            // strip out unwanted data and reduce response to first 6 objects

            spliceData(popularPeople, 4);
            spliceData(popularStarships, 6);
            spliceData(popularPlanets, 9);

            commit("setPeople", popularPeople);
            commit("setStarships", popularStarships);
            commit("setPlanets", popularPlanets);

            commit("Loading", false);
          });
      } catch (error) {
        const message = error;
        dispatch("showToast", { message: message, context: "error" });
      }
    },
    fetchList({ commit, dispatch }, item) {
      commit("Loading", true);
      http
        .get(`${item}`)
        .then(response => {
          const data = response.data.results;
          return reconstructObject(data);
        })
        .then(response => {
          const capitalized = capitalizeItem(item);

          commit(`set${capitalized}`, response);

          commit("Loading", false);
        })
        .catch(response => {
          const message = response;
          dispatch("showToast", { message: message, context: "error" });
        });
    }
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
});

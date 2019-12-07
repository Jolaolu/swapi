<template>
  <div class="home">
    <Header @emitting="getSearchTerm" />

    <main class="home-content">
      <div class="toast-wrapper">
        <Toast
          :message="toast.message"
          :context="toast.context"
          v-if="toast.show"
        />
      </div>
      <section class="starships-list">
        <div class="home-content__title-wrapper">
          <h3 class="home-content__title">Popular Starships</h3>
          <div class="title-underline"></div>
        </div>
        <div class="isLoading" v-if="isLoading">
          <Loader />
        </div>
        <div class="popular-starships">
          <StarshipCard :starships="starships" v-if="!isLoading" />
        </div>
        <div class="viewmore-button">
          <router-link to="/starships">
            <ViewMore />
          </router-link>
        </div>
      </section>
      <section class="planets-list">
        <div class="home-content__title-wrapper">
          <h3 class="home-content__title">Popular Planets</h3>
          <div class="title-underline"></div>
        </div>
        <div class="isLoading" v-if="isLoading">
          <Loader />
        </div>
        <div class="popular-planets">
          <PlanetCard :planets="planets" v-if="!isLoading" />
        </div>
        <div class="viewmore-button">
          <router-link to="/planets">
            <PlanetCardNav />
          </router-link>
        </div>
      </section>
      <section class="people-list">
        <div class="home-content__title-wrapper">
          <h3 class="home-content__title">Popular Characters</h3>
          <div class="title-underline"></div>
        </div>
        <div class="isLoading" v-if="isLoading">
          <Loader />
        </div>
        <div class="popular-characters">
          <PeopleCard :people="people" v-if="!isLoading" />
        </div>
        <div class="viewmore-button">
          <router-link to="/people">
            <ViewMore />
          </router-link>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
export default {
  name: "home",
  data() {
    return {
      searchItem: ""
    };
  },
  props: {
    q: {
      type: String,
      default: null
    }
  },
  components: {
    Header: () => import("@/components/Header.vue"),
    StarshipCard: () => import("@/components/StarshipCard.vue"),
    PlanetCard: () => import("@/components/PlanetCard.vue"),
    PeopleCard: () => import("@/components/PeopleCard.vue"),
    ViewMore: () => import("@/components/ViewMoreButton"),
    PlanetCardNav: () => import("@/components/PlanetCardNav.vue"),
    Loader: () => import("@/components/Loader.vue"),
    Toast: () => import("@/components/Toast.vue"),
    Footer: () => import("@/components/Footer.vue")
  },
  methods: {
    ...mapActions(["fetchPopularData"]),

    makeSearchRequest: function() {
      this.$router.push({
        name: "search",
        query: { q: this.searchItem }
      });
      const searchQuery = this.searchItem;
      this.$store.dispatch("searchPopularData", searchQuery);
    },

    getSearchTerm: function(searchValue) {
      this.searchItem = searchValue;
      this.makeSearchRequest();
    }
  },
  mounted() {
    this.fetchPopularData();
  },
  computed: mapGetters(["people", "planets", "starships", "isLoading", "toast"])
};
</script>

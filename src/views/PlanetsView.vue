<template>
  <div class="">
    <Header @emitting="getSearchTerm" />
    <main class="home-content">
      <div class="toast-wrapper">
        <Toast
          :message="toast.message"
          :context="toast.context"
          v-if="toast.show"
        />
      </div>
      <section class="planets-list">
        <div class="home-content__title-wrapper">
          <h3 class="home-content__title"> Planets</h3>
          <div class="title-underline"></div>
        </div>
        <div class="isLoading" v-if="isLoading">
          <Loader />
        </div>
        <div class="popular-planets">
          <div
            class="planet-card"
            v-for="(planet, index) in planets"
            :key="index"
          >
            <PlanetCard :planet="planet" v-if="!isLoading" />
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>
<script>
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
    PlanetCard: () => import("@/components/PlanetCard.vue"),
    Loader: () => import("@/components/Loader.vue"),
    Toast: () => import("@/components/Toast.vue"),
    Footer: () => import("@/components/Footer.vue")
  },
  methods: {
    ...mapActions(["fetchList"]),

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
    this.fetchList("planets");
  },
  computed: mapGetters(["planets", "isLoading", "toast"])
};
</script>
<style lang=""></style>

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
      <section class="starships-list">
        <div class="home-content__title-wrapper">
          <h3 class="home-content__title">Starships</h3>
          <div class="title-underline"></div>
        </div>
        <div class="isLoading" v-if="isLoading">
          <Loader />
        </div>
        <div class="popular-starships">
          <div
            class="starship-card"
            v-for="(starship, index) in starships"
            :key="index"
          >
            <StarshipCard :starship="starship" v-if="!isLoading" />
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
    StarshipCard: () => import("@/components/StarshipCard.vue"),
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
    this.fetchList("starships");
  },
  computed: mapGetters(["starships", "isLoading", "toast"])
};
</script>
<style lang=""></style>

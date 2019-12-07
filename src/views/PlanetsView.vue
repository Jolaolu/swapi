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
          <h3 class="home-content__title">Planets</h3>
          <div class="title-underline"></div>
        </div>
        <div class="isLoading" v-if="isLoading">
          <Loader />
        </div>
        <div class="popular-planets">
            <PlanetCard :planets="planets" v-if="!isLoading" />
        </div>
      </section>
      <div class="pagination-wrapper"> 
        <div class="pagination-info">{{pageDetails.from}} - {{pageDetails.to}} of {{pageDetails.totalData}} </div>
          <Pagination @changing="changePage" />
      </div>
    
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
    Footer: () => import("@/components/Footer.vue"),
    Pagination: () => import("@/components/Pagination")
  },
  methods: {
    ...mapActions(["fetchList"]),

    makeSearchRequest: function() {
      const searchQuery = this.searchItem;
      this.$store.dispatch("searchList", {
        searchItem: searchQuery,
        item: "planets"
      });
    },

    getSearchTerm: function(searchValue) {
      this.searchItem = searchValue;
      this.makeSearchRequest();
    },
    changePage(value) {
      this.$store.dispatch("changePage", { value: value, item: "planets" });
    }
  },
  mounted() {
    this.fetchList("planets");
  },
  computed: mapGetters(["planets", "isLoading", "toast", "pageDetails"])
};
</script>
<style lang=""></style>

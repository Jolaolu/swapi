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
          <StarshipCard :starships="starships" v-if="!isLoading" />
        </div>
      </section>
      <Pagination @changing="changePage" />
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
    Footer: () => import("@/components/Footer.vue"),
    Pagination: () => import("@/components/Pagination")
  },
  methods: {
    ...mapActions(["fetchList"]),

    makeSearchRequest: function() {
      const searchQuery = this.searchItem;
      this.$store.dispatch("searchList", {
        searchItem: searchQuery,
        item: "starships"
      });
    },

    getSearchTerm: function(searchValue) {
      this.searchItem = searchValue;
      this.makeSearchRequest();
    },
    changePage(value) {
      this.$store.dispatch("changePage", { value: value, item: "starships" });
    }
  },
  mounted() {
    this.fetchList("starships");
  },
  computed: mapGetters(["starships", "isLoading", "toast"])
};
</script>
<style lang=""></style>

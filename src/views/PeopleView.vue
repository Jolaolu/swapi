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
      <section class="people-list">
        <div class="home-content__title-wrapper">
          <h3 class="home-content__title">Characters</h3>
          <div class="title-underline"></div>
        </div>
        <div class="isLoading" v-if="isLoading">
          <Loader />
        </div>
        <div class="popular-characters">
          <PeopleCard :people="people" v-if="!isLoading" />
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
    PeopleCard: () => import("@/components/PeopleCard.vue"),
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
        item: "people"
      });
    },

    getSearchTerm: function(searchValue) {
      this.searchItem = searchValue;
      this.makeSearchRequest();
    },
    changePage(value) {
      this.$store.dispatch("changePage", { value: value, item: "people" });
    }
  },
  mounted() {
    this.fetchList("people");
  },
  computed: mapGetters(["people", "isLoading", "toast"])
};
</script>
<style lang=""></style>

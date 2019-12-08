<template>
  <div class>
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
        <div class="pagination-info">
          {{ pageDetails.from }} - {{ pageDetails.to }} of {{ totalPageData }}
        </div>
        <Pagination
          @changing="changePage"
          :totalPages="getPageCount()"
          :currentPage="pageNumber"
        />
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
      searchItem: "",
      pageNumber: 1,
      totalPages: null,
      pageDetails: {
        to: 10,
        from: 1,
        perPage: 10
      }
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

    getPageCount: function() {
      const total = this.totalPageData;

      const perPage = this.pageDetails.perPage;

      return (this.totalPages = Math.ceil(total / perPage));
    },
    getSearchTerm: function(searchValue) {
      this.searchItem = searchValue;
      this.makeSearchRequest();
    },
    changePage(value) {
      switch (value) {
        case "next":
          this.pageNumber++;
          this.pageDetails.from += this.pageDetails.perPage;
          this.pageDetails.to += this.pageDetails.perPage;
          if (this.pageDetails.to > this.totalPageData) {
            this.pageDetails.to = this.totalPageData;
          }
          break;
        case "previous":
          this.pageNumber--;
          this.pageDetails.from -= this.pageDetails.perPage;
          this.pageDetails.to -= this.pageDetails.perPage;
          break;
        default:
          this.pageNumber = 1;
          break;
      }

      this.$store.dispatch("fetchList", {
        item: "people",
        pageNumber: this.pageNumber
      });
    }
  },
  mounted() {
    this.fetchList({ item: "planets", pageNumber: this.pageNumber });
  },
  computed: mapGetters(["planets", "isLoading", "toast", "totalPageData"])
};
</script>
<style lang=""></style>

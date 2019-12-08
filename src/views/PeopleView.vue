<template>
  <section class>
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
          <div class="filter">
            <label for="filterList">Filter:</label>
            <select v-model="defaultFilter" name id>
              <option
                v-for="(gender, index) in genders"
                :key="index"
                :value="gender.toLowerCase()"
                >{{ gender }}</option
              >
            </select>
          </div>
          <div class="people-container">
            <div class v-for="(person, index) in people" :key="index">
              <PeopleCard
                v-if="
                  defaultFilter === 'all' || person.gender === defaultFilter
                "
                :person="person"
              />
            </div>
          </div>
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
  </section>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "home",
  data() {
    return {
      searchItem: "",
      defaultFilter: "all",
      genders: ["All", "Male", "Female", "Hermaphrodite"],
      pageNumber: 1,
      totalPages: null,
      pageDetails: {
        to: null,
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
    getPageCount: function() {
      const total = this.totalPageData;

      const perPage = this.pageDetails.perPage;
      const totalItemsCount = total;
      const numberOfItemsPerPage = perPage;
      const page = this.pageNumber;
      this.pageDetails.from =
        page * numberOfItemsPerPage - (numberOfItemsPerPage - 1);
      this.pageDetails.to = Math.min(
        this.pageDetails.from + numberOfItemsPerPage - 1,
        totalItemsCount
      );

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
          break;
        case "previous":
          this.pageNumber--;
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
    this.fetchList({ item: "people", pageNumber: this.pageNumber });
  },
  computed: {
    ...mapGetters(["people", "isLoading", "toast", "totalPageData"])
  }
};
</script>
<style lang=""></style>

<template>
  <div class="search-wrapper">
    <div class="search-container">
      <div class="search-icon__container">
        <font-awesome-icon
          :icon="['fas', 'search']"
          class="search-icon"
          size="lg"
        />
      </div>
      <div class="search">
        <input
          class="search-field"
          type="search"
          name="search"
          id=""
          placeholder="Enter a search term"
          @keyup="search"
          v-model="searchItem"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Search",
  data() {
    return {
      searchItem: ""
    };
  },
  methods: {
    search: function(e) {
      e.preventDefault();
      this.$emit("searching", this.searchItem);
    }
  }
};
</script>
<style lang="scss"></style>

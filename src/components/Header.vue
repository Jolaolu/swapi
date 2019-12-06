<template>
  <div class="header">
    <router-link to="/">
      <img
        class="header-logo"
        :src="require('@/assets/images/logo.png')"
        alt
        srcset
      />
    </router-link>

    <div class="header-hero__container">
      <div class="header-hero__main-wrapper">
        <div class="header-hero__main">
          <img
            class="main-logo"
            :src="require('@/assets/images/logo.png')"
            alt
            srcset
          />
          <h4 class="header-hero__title">Directory</h4>
        </div>
        <div class="underline"></div>
      </div>
      <div class="header-hero__detail">
        <div class="header-hero__text">
          Find your favourite Characters, Films, Species, Starships and Planets
        </div>
        <Search @searching="dispatch" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    dispatch: function(searchValue) {
      this.$emit("emitting", searchValue);
    }
  },
  components: {
    Search: () => import("@/components/Search")
  }
};
</script>
<style lang="scss"></style>

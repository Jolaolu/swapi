<template>
  <div class="home">
    <Header />
    <main class="home-content">
      <section class="starships-list">
        <div class="home-content__title-wrapper">
          <h3 class="home-content__title">Popular Starships</h3>
          <div class="title-underline"></div>
        </div>
        <div class="popular-starships">
          <div class="starship-card" v-for="(starship, index) in starships" :key="index">
            <StarshipCard :starship="starship" />
          </div>
        </div>
        <div class="viewmore-button">
          <ViewMore />
        </div>
      </section>
      <section class="planets-list">
        <div class="home-content__title-wrapper">
          <h3 class="home-content__title">Popular Planets</h3>
          <div class="title-underline"></div>
        </div>
        <div class="popular-planets">
          <div class="planet-card" v-for="(planet, index) in planets" :key="index">
            <PlanetCard :planet="planet" />
          </div>
        </div>
        <div class="viewmore-button">
          <PlanetCardNav />
        </div>
      </section>
      <section class="people-list">
        <div class="home-content__title-wrapper">
          <h3 class="home-content__title">Popular Characters</h3>
          <div class="title-underline"></div>
        </div>
        <div class="popular-characters">
          <div class="people-card" v-for="(character, index) in characters" :key="index">
            <PeopleCard :character="character" />
          </div>
        </div>
        <div class="viewmore-button">
          <ViewMore />
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
  components: {
    Header: () => import("@/components/Header.vue"),
    StarshipCard: () => import("@/components/StarshipCard.vue"),
    PlanetCard: () => import("@/components/PlanetCard.vue"),
    PeopleCard: () => import("@/components/PeopleCard.vue"),
    ViewMore: () => import("@/components/ViewMoreButton"),
    PlanetCardNav: () => import("@/components/PlanetCardNav.vue"),
    // Loader: () => import("@/components/Loader.vue"),
    // Toast: () => import("@/components/Toast.vue"),
    Footer: () => import("@/components/Footer.vue")
  },
  methods: {
    ...mapActions(["fetchPopularData"])
  },
  created() {
    this.fetchPopularData();
  },
  computed: mapGetters(["characters", "planets", "starships"])
};
</script>

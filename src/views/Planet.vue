<template>
  <div class="planet-container__wrapper">
    <router-link to="/planets">
      <div class="back-button">
        <font-awesome-icon :icon="['fas', 'caret-left']" size="4x" />
        <span>Go back</span>
      </div>
    </router-link>
    <div class="planet-container">
      <div class="planet-name__container">
        <h2 class="planet-name"> {{ planet.name }}</h2>
      </div>
      <div class="planet-information__container">
        <div class="planet-information">
          <div>
            <span>Rotation period: </span>
            {{ planet.rotation_period }}
          </div>
          <div>
            <span>Orbital period: </span>
            {{ planet.orbital_period }}
          </div>
          <div>
            <span>Diameter: </span>
            {{ planet.diameter }}
          </div>
          <div>
            <span>population: </span>
            {{ planet.population }}
          </div>
        </div>
        <div class="planet-information">
          <div>
            <span>climate: </span>
            {{ planet.climate }}
          </div>
          <div>
            <span>gravity: </span>
            {{ planet.gravity }}
          </div>
          <div>
            <span>terrain: </span>
            {{ planet.terrain }}
          </div>
        </div>
      </div>
      <div class="planet-image__wrapper">
        <img class="planet-picture" :src="getRandomImage()" alt />
      </div>
    </div>
  </div>
</template>
<script>
import { getRandomNumber } from "@/utils/helpers";
import planet1 from "@/assets/images/planet-1.jpg";
import planet2 from "@/assets/images/planet-2.jpg";
import planet3 from "@/assets/images/planet-3.jpg";
export default {
  data() {
    return {
      images: [planet1, planet2, planet3],
      selectedImage: null
    };
  },
  components: {},
  props: ["planet"],
  methods: {
    getRandomImage() {
      const number = getRandomNumber(this.images.length);
      return (this.selectedImage = this.images[number]);
    }
  },
  created() {}
};
</script>

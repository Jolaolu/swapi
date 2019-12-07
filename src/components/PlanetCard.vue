<template>
  <div class="planetcard-wrapper">
    <article class="planetcard" v-for="(planet, index) in planets" :key="index">
      <router-link
        :to="{ name: 'Planet', params: { id: planet.id, planet: planet } }"
      >
        <div class="planetcard-image__wrapper">
          <img :src="getRandomImage()" alt srcset />
        </div>
        <div class="planetcard-title">{{ planet.name }}</div>
      </router-link>
    </article>
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
  props: ["planets"],
  methods: {
    getRandomImage() {
      const number = getRandomNumber(this.images.length);
      return (this.selectedImage = this.images[number]);
    }
  },
  created() {}
};
</script>

<template>
  <article class="planetcard">
    <router-link to="">
      <div class="planetcard-image__wrapper">
        <img :src="selectedImage" alt="" srcset="" />
      </div>
      <div class="planetcard-title"> Corellia</div>
    </router-link>
  </article>
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
  methods: {
    getRandomImage() {
      const number = getRandomNumber(this.images.length);
      this.selectedImage = this.images[number];
    }
  },
  created() {
    this.getRandomImage();
  }
};
</script>

<template>
  <article class="starshipcard">
    <div class="starshipcard-image__wrapper">
      <img class="starship-image" :src="selectedImage" alt="" srcset="" />
    </div>
    <div class="starshipcard-info__wrapper">
      <div class="starshipcard-info">
        <h3 class="starshipcard-title">Ghost</h3>
        <span class="year"> Birth Year: 19BBY</span>
        <span class="gender"> Gender: Male</span>
        <div class="button-wrapper">
          <router-link to=""> <ReadMore /> </router-link>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
import { getRandomNumber } from "@/utils/helpers";
import starship1 from "@/assets/images/starship-1.jpg";
import starship2 from "@/assets/images/starship-2.jpg";
import starship3 from "@/assets/images/starship-3.jpg";
import starship4 from "@/assets/images/starship-4.jpg";
import starship5 from "@/assets/images/starship-5.jpg";
import starship6 from "@/assets/images/starship-6.jpg";
export default {
  data() {
    return {
      images: [
        starship1,
        starship2,
        starship3,
        starship4,
        starship5,
        starship6
      ],
      selectedImage: null
    };
  },
  components: {
    ReadMore: () => import("@/components/ReadMoreButton")
  },
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

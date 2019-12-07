<template>
  <div class="starshipcard-wrapper">
    <article class="starshipcard" v-for="(starship, index) in starships" :key="index">
      <div class="starshipcard-image__wrapper">
        <img class="starship-image" :src="getRandomImage()" alt srcset />
      </div>
      <div class="starshipcard-details__wrapper">
        <div class="starshipcard-info__wrapper">
          <div class="starshipcard-info">
            <h3 class="starshipcard-title">{{ starship.name }}</h3>
            <span class="model">
              <strong>Model:</strong>
              {{ starship.model }}
            </span>
            <span class="capacity">
              <strong>Capacity:</strong>
              {{ starship.cargo_capacity }}
            </span>
            <div class="button-wrapper">
              <router-link
                :to="{
                name: 'Starship',
                params: { id: starship.id, starship: starship }
              }"
              >
                <ReadMore />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
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
  props: ["starships"],
  methods: {
    getRandomImage() {
      const number = getRandomNumber(this.images.length);
      return (this.selectedImage = this.images[number]);
    }
  },
  created() {}
};
</script>

<template>
  <div class="starship-container__wrapper">
    <router-link to="/starships">
      <div class="back-button">
        <font-awesome-icon :icon="['fas', 'caret-left']" size="4x" />
        <span>Go back</span>
      </div>
    </router-link>
    <div class="starship-container">
      <div class="starship-image__wrapper">
        <img class="starship-picture" :src="getRandomImage()" alt />
      </div>
      <div class="starship-information__wrapper">
        <h2 class="starship-name">{{starship.name}}</h2>
        <div class="starship-information">
          <div> <strong>Model:</strong>{{starship.model}}</div>
          <div><strong>Length:</strong>{{starship.length}}</div>
          <div><strong>Crew:</strong>{{starship.crew}}</div>
          <div><strong>Hyperdrive Rating:</strong>{{starship.hyperdrive_rating}}</div>
          <div><strong>Capacity:</strong>{{starship.cargo_capacity}}</div>
          <div><strong>Passengers:</strong>{{starship.passengers}}</div>
          <div><strong>Class:</strong>{{starship.starship_class}}</div>
          <div><strong>Manufacturers:</strong>{{starship.manufacturer}}</div>
          <div><strong>MGLT:</strong>{{starship.MGLT}}</div>
          <div><strong>Consumables:</strong>{{starship.consumables}}</div>
        </div>
      </div>
    </div>
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
  components: {},
  props: ["starship"],
  methods: {
    getRandomImage() {
      const number = getRandomNumber(this.images.length);
      return (this.selectedImage = this.images[number]);
    }
  },
  created() {}
};
</script>

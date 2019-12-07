<template>
  <div class="person-container__wrapper">
    <div class="person-container">
      <div class="person-image__wrapper">
        <img class="person-picture" :src="getRandomImage()" alt />
        <h2 class="person-name">Name: {{ person.name }}</h2>
      </div>
      <div class="person-information__wrapper">
        <div class="person-information">
          <div>
            <span>Gender</span>
            {{ person.gender }}
          </div>
          <div>
            <span>DOB</span>
            {{ person.birth_year }}
          </div>
          <div>
            <span>Mass</span>
            {{ person.mass }}
          </div>
          <div>
            <span>Height</span>
            {{ person.height }}
          </div>
        </div>
        <div class="person-information">
          <div>
            <span>Hair color</span>
            {{ person.hair_color }}
          </div>
          <div>
            <span>Skin color</span>
            {{ person.skin_color }}
          </div>
          <div>
            <span>eye color</span>
            {{ person.eye_color }}
          </div>
        </div>
      </div>

      <router-link to="/people">
        <div class="back-button">
          <font-awesome-icon :icon="['fas', 'caret-left']" size="4x" />
          <span>Go back</span>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { getRandomNumber } from "@/utils/helpers";
import character1 from "@/assets/images/character-1.jpg";
import character2 from "@/assets/images/character-2.jpg";
import character3 from "@/assets/images/character-3.jpg";
import character4 from "@/assets/images/character-4.jpg";
import yoda from "@/assets/images/baby-yoda-plush-toy-mattel-the-mandalorian.png";
export default {
  data() {
    return {
      images: [character1, character2, character3, character4, yoda],
      selectedImage: null
    };
  },
  props: ["person"],
  components: {},
  methods: {
    getRandomImage() {
      const number = getRandomNumber(this.images.length);
      return (this.selectedImage = this.images[number]);
    }
  },
  created() {}
};
</script>

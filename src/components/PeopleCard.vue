<template>
    <article class="peoplecard">
        <div class="peoplecard-container">
            <div class="peoplecard-image__wrapper">
                <img :src="selectedImage" alt="" srcset="" class="person-image">
            </div>
            <div class="peoplecard-details"> 
                 <div class="peoplecard-info">
                    <h3 class="peoplecard-title">Luke Skywalker</h3>
                    <span class="year"> Birth Year: 19BBY</span>
                    <span class="Gender"> Gender: Male</span>
                    <div class="button-wrapper">
                        <router-link to=""> <ReadMore /> </router-link>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>
<script>
import { getRandomNumber } from "@/utils/helpers";
import character1 from "@/assets/images/character-1.jpg";
import character2 from "@/assets/images/character-2.jpg";
import character3 from "@/assets/images/character-3.jpg";
import character4 from "@/assets/images/character-4.jpg";
export default {
  data() {
    return {
      images: [character1, character2, character3, character4],
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

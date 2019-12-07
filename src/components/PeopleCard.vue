<template>
  <article class="article">
    <div class="peoplecard-container">
      <div class="peoplecard-image__wrapper">
        <img :src="getRandomImage()" alt srcset class="person-image" />
      </div>
      <div class="peoplecard-details">
        <div class="peoplecard-info">
          <h3 class="peoplecard-title">{{ person.name }}</h3>
          <span class="year">
            <strong>Birth Year:</strong>
            {{ person.birth_year }}
          </span>
          <span class="Gender">
            <strong>Gender:</strong>
            {{ person.gender }}
          </span>
          <div class="button-wrapper">
            <router-link
              :to="{
                name: 'Person',
                params: { id: person.id, person: person }
              }"
            >
              <ReadMore />
            </router-link>
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
import yoda from "@/assets/images/baby-yoda-plush-toy-mattel-the-mandalorian.png";
export default {
  data() {
    return {
      images: [character1, character2, character3, character4, yoda],
      selectedImage: null
    };
  },
  props: ["person"],
  components: {
    ReadMore: () => import("@/components/ReadMore")
  },
  methods: {
    getRandomImage() {
      const number = getRandomNumber(this.images.length);
      return (this.selectedImage = this.images[number]);
    }
  },
  created() {}
};
</script>

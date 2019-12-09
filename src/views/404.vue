<template>
  <transition name="fade">
    <div class="mafo">
      <div class="o4-content">
        <h1>404</h1>
        <p>You have lost your way to the realm. Humans are not allowed here.</p>
        <router-link to="/">
          <button>Go Back Home</button>
        </router-link>
      </div>
      <div class="o4-starship-container">
        <img
          :src="require('@/assets/images/starship.jpg')"
          class="o4-starship"
          alt
          srcset
        />
      </div>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
.mafo {
  background-color: black;
  width: 100%;
  height: 100vh;
}
.o4-content {
  color: white;
  align-items: center;
  display: flex;
  flex-direction: column;
}
button {
  cursor: pointer;
}
@media (min-width: 1025px) {
  h1 {
    font-size: 10rem;
  }
  .mafo {
    background-color: black;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .o4-content {
    color: white;
    align-items: center;
    display: flex;
    flex-direction: column;
    p {
      margin: 5rem 0;
      font-size: 2rem;
      width: 55%;
    }
    button {
      padding: 2rem 4rem;
      border-radius: 5rem;
    }
  }
  .o4-starship {
    width: 600px;
    height: 500px;
    border: none;
  }
}
@media (max-width: 1024px) {
  .mafo {
    background-color: black;
    display: grid;
    grid-template-rows: 50% 50%;
  }
  img {
  }
  .o4-content {
    justify-content: center;
  }
  h1 {
    font-size: 5rem;
  }
  p {
    margin: 4rem 0;
    font-size: 2rem;
    width: 80%;
    text-align: center;
  }
  button {
    padding: 1rem 3rem;
    border-radius: 5rem;
  }
}
</style>

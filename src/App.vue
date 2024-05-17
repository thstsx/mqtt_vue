<template>
  <div id="app">
    <!-- Conditionally render the buttons only on the main page -->
    <!-- <router-link v-if="isMainPage" to="/publisher">Publisher UI</router-link>
    <router-link v-if="isMainPage" to="/subscriber">Subscriber UI</router-link> -->
    <div v-if="isMainPage">
      <button @click="goToPublisher">Publisher UI</button>
      <button @click="goToSubscriber">Subscriber UI</button>
    </div>


    <!-- Render the router view to display the current route's component -->
    <router-view></router-view>
  </div>
</template>

<script>
import Publisher from './components/Publisher.vue';
import Subscriber from './components/Subscriber.vue';

export default {
  computed: {
  // components: {
  //   Publisher,
  //   Subscriber
  // }
    isMainPage() {
        return this.$route.path === '/';
        //return ['', '/'].includes(this.$route.path);
        //return this.$route.name === 'home';
    }
  },
  methods: {
    // Method to navigate to Publisher UI
    goToPublisher() {
      this.$router.push('/publisher');
    },
    // Method to navigate to Subscriber UI
    goToSubscriber() {
      this.$router.push('/subscriber');
    }
  }

};
</script>

<style>
.ui-container {
  display: flex;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

.line {
    border: 3px solid red;
    width: 200px;
}

.wrapper {
    background-color: rgb(247, 244, 244);
    list-style-type: none;
    padding: 0;
    border-radius: 5px;
  }
  .form-row {
    display: flex;
    justify-content: flex-end;
    padding: 0.5em;
  }
  .form-row > label {
    padding: 1em;
    flex: 1;
    font-size: 1.2em;
    font-weight: bold;
  }
  
</style>

<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <ThreeContainer/>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import ThreeContainer from "./components/ThreeContainer.vue";

export default {
  name: "app",
  components: {
    HelloWorld,
    ThreeContainer
  }
};
</script>

<style>
html,
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

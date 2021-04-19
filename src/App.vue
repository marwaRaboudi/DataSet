<template>
  <div id="app">
    <Request/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Request from './components/Request.vue';

@Component({
  components: {
    Request
  }
})
export default class App extends Vue {
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 50px;
}
</style>

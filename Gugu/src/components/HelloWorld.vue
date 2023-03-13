<template>
    <div id="app">
      
      <Left/>
      <Right/>
    </div>
  </template>
  
  <script>
  import Left from './left.vue';
  import Right from './right.vue'
  export default {
      name: "HelloWorld",
      components: {
          Left,
          Right
      }
  }
  </script>
  
  <style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
   
    width: 100%;
    height: 600px;
    background-color:azure;
  }
  </style>
  
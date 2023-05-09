<template>
    <div>
      <h1>Posts</h1>
      <div v-show="loading">Loading...</div>
      <div v-for="post in posts" :key="post.id">
        <router-link :to="{ name: 'post', params: { id: post.id } }">
          [ID: {{ post.id }}] {{ summary(post.text) }}
        </router-link>
      </div>
      <router-view></router-view>
    </div>
  </template>

  <script setup>
  import { useStore } from "vuex"
  import { ref, computed, onMounted } from 'vue';
  
  const store = useStore()
  
  const loading = ref(false)
  const posts = computed(() => store.state.modulePost.posts)
  
//   onBeforeMount(() => {
  onMounted(() => {  
    fetchData();
  });
  
  const fetchData = () => {
    loading.value = true;
    store.dispatch("modulePost/loadPosts").then(() => {
      loading.value = false;
    });
  };
  
  const summary = (val) => {
    if (typeof val === "string") {
      return val.substring(0, 20) + "...";
    }
    return val;
  };
  </script>
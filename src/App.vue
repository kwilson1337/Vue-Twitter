<script setup lang="ts">
import Navigation from './components/Navigation/Navigation.vue';
import LoginBar from '@/components/RegisterLogin/LoginBar.vue'
</script>

<template>
  <div class="app-base">
    <div class="container">
      <div class="app-base__inner">
        <div class="row">          
          <div class="col-md-3">
            <Navigation />
          </div>

          <div class="col-md-9 --border-left">
            <RouterView />
          </div>
        </div>
      </div>
    </div>

    <LoginBar />
  </div>  
</template>

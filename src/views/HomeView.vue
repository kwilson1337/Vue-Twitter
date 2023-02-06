<script setup lang="ts">
// methods
import { useRouter } from 'vue-router';
import { computed, ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { getFullCollection } from '@/composables/firebaseHelpers';

// components
import PostTweet from '@/components/Home/postTweet.vue';
import newsFeed from '@/components/NewsFeed/newsFeed.vue';
import TweetListItem from '@/components/NewsFeed/tweetListItem.vue';

const appData: Ref<{
  tweets: object[] | null
}> = ref({
  tweets: null
})

const currentRoute = computed(() => {      
  if(useRouter().currentRoute.value.name) {
    return useRouter().currentRoute.value.name.charAt(0).toUpperCase() + useRouter().currentRoute.value.name.slice(1);
  }    
})

const getAllTweets = async () => {
    const tweets = await getFullCollection('tweets')    
    const sorted = tweets.sort((a, b) => new Date(b.data.tweetTimePost.seconds) - new Date(a.data.tweetTimePost.seconds))
    
    appData.value.tweets = sorted    
}

const tweetPosted = () => {    
  getAllTweets()   
}

onMounted(() => {
  getAllTweets()
})
</script>

<template>  
  <div class="row">
    <div class="col-md-9 h-100 --margin-x-fix --border-right">
    <div class="route-name">
      <div class="container">
        <p class="h2">{{ currentRoute }}</p>
      </div>
    </div>
    <PostTweet         
      class="px-3"    
      @getAllTweets="tweetPosted"
      />
              
      <newsFeed          
        class="px-3"           
      >
          <TweetListItem 
              :tweets="appData.tweets"
          />
      </newsFeed>   
  </div>
    <div class="col-md-3">

    </div>
  </div>
</template>

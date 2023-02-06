<script setup lang="ts">
import type { Tweet } from '@/types/tweets';
import likeButton from './likeButton.vue';

const props = defineProps<{
    tweets: Tweet | null
}>();

const likeTweet = () => {

}
</script>

<template>   
<div 
    v-if="props.tweets"
    class="news-item"
    v-for="(single, i) in props.tweets"
    :key="single.id"       
>            
    <div :data-tweet-id="single.id" class="news-item__inner justify-content-start align-items-center">
        <div v-if="single.data.userImage" class="profile-header__profile --overflow --small p-0 me-3">
            <div class="profile-img m-0">
                <img :src="single.data.userImage" :alt="single.data.author" class="img-fluid">
            </div>
        </div>
        <div class="content">                                        
            <p class="title mb-0 fw-bold">{{ single.data.author }}</p>
            
            <p class="--fs-13 mb-0">
                {{ single.data.tweetDesc }}
            </p>            
                                            
        </div>    
        
        <div class="news-item__bottom-actions w-100">
            <likeButton                 
                :tweetID="single.id"
            />
        </div>
    </div>            
</div>
</template>
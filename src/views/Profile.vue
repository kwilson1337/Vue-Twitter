<script setup lang="ts">
import Header from '@/components/Profile/Header.vue';
import NewsTabs from '@/components/NewsList/NewsTabs.vue';
import { ref, onMounted, computed } from 'vue'
import type { Ref } from 'vue'
import type { Tweet } from '@/types/tweets';
import { getQueryGroup } from "@/composables/firebaseHelpers"
import TweetListItem from '@/components/NewsFeed/tweetListItem.vue';
import { useCurrentUser } from "@/stores/CurrentUser"
import newsFeed from '@/components/NewsFeed/newsFeed.vue';


const userStore = useCurrentUser();
const appData: Ref<{
    currentTab: string, 
    tweets: Tweet | null
}> = ref({
    currentTab: "tweets",
    tweets: null
})

const tabs = [
    { type: "tweets", label: "Tweets" },
    { type: "t&r", label: "Tweets & replys" },   
]

const getTab = (tab: string) => {
    appData.value.currentTab = tab
}

const getTweetsForCurrentUer = async () => {        
    const getTweets: Tweet  = await getQueryGroup('tweets', "userID", '==', userStore.state.userID)
    
    // sort by date posted
    getTweets.sort((a, b) => new Date(b.data.tweetTimePost.seconds) - new Date(a.data.tweetTimePost.seconds))    
    appData.value.tweets = getTweets                
}

const getTweetCount = computed(() => {
    if(appData.value.tweets !== null) return appData.value.tweets.length   

    return 0
})

onMounted(() => {
    getTweetsForCurrentUer()
})
</script>

<template>
    <div class="--border-right profile-page">
        <div class="profile-page__inner">
            <Header
                :tweetCount="getTweetCount"
            />

            <NewsTabs 
                class="mt-4"
                :tabs="tabs"
                :is-selected="appData.currentTab"
                @toggleNews="getTab"
            />
            
            <div class="container">
                <newsFeed 
                    v-if="appData.tweets !== null && appData.tweets.length"
                    class="--margin-x-fix px-1"
                >
                    <TweetListItem 
                        :tweets="appData.tweets"
                    />
                </newsFeed>   
                
                <div v-else>
                    <div class="text-center px-3 py-5">
                        <h2>No Tweets</h2>
                    </div>
                </div>
            </div>       
        </div>        
    </div>    
</template>
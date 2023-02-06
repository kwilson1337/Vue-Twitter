<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { db, useGetSingleDocument } from "@/composables/firebaseHelpers"
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { useCurrentUser } from "@/stores/CurrentUser"

const userStore = useCurrentUser()
const props = withDefaults(defineProps<{    
    tweetID: string
}>(), {        
})

const appData: Ref<{
    isActive: boolean
    tweetCount: number 
}> = ref({
    isActive: false,
    tweetCount: 0
})

const likeTweet = async () => {            
    const tweetLikes = await useGetSingleDocument('tweets', props.tweetID, 'tweetLikes')
    const docRef = doc(db, "tweets", props.tweetID);                  

    if(tweetLikes && tweetLikes.includes(userStore.state.userID)) {        
        await updateDoc(docRef, {
            tweetLikes: arrayRemove(userStore.state.userID)
        })
        await getCurrentLikes()
        appData.value.isActive = false
    } else {
        await updateDoc(docRef, {
            tweetLikes: arrayUnion(userStore.state.userID)
        })
        await getCurrentLikes()
        appData.value.isActive = true
    }

}

const getCurrentLikes = async () => {
    const tweetLikes = await useGetSingleDocument('tweets', props.tweetID, 'tweetLikes')
    
    // like count
    if(tweetLikes) {        
        appData.value.tweetCount = tweetLikes.length
    }

    // has current user liked it
    if(tweetLikes && tweetLikes.includes(userStore.state.userID)) {
        appData.value.isActive = true
    }
    
}

getCurrentLikes()
</script>

<template>
    <div class="twitter-like-button">
        <div class="twitter-like-button__inner">
            <div class="twitter-like-button__left">
                <i 
                    @click="likeTweet"
                    class="fa-light fa-heart"
                    :class="[appData.isActive ? '--active' : '']"
                ></i>                
            </div>
            <div class="twitter-like-button__right">
                <span v-if="appData.tweetCount > 0" class="--fs-13 --color-color2">{{ appData.tweetCount }}</span>
            </div>
        </div>          
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue';
import { useCurrentUser } from "@/stores/CurrentUser"
import { db } from "@/composables/firebaseHelpers"
import { collection, Timestamp, addDoc } from 'firebase/firestore'

const userStore = useCurrentUser();
const emits = defineEmits<{
    (e: 'getAllTweets'): void
}>()
const appData: Ref<{
    tweetDesc: string,
    tweets: object[],    
}> = ref({
    tweetDesc: '',  
    tweets: [],    
})

const postTweat = async () => {            
    const tweet = {
        tweetDesc: appData.value.tweetDesc,
        tweetTimePost: Timestamp.fromDate(new Date()),
        author: userStore.state.displayName,
        userID: userStore.state.userID,
        userImage: userStore.state.profileImage
    }
    await addDoc(collection(db, "tweets"), tweet)  
    appData.value.tweetDesc = ''        
    emits('getAllTweets')       
}

</script>

<template>    
    <div class="post-tweet --border-bottom">        
        <div class="post-tweet__inner d-flex">
            <div class="profile-header__profile --overflow --small p-0 me-3">
                <div class="profile-img m-0">
                    <img :src="userStore.state.profileImage" alt="" class="img-fluid">
                </div>
            </div>                        
            
            <div class="post-tweet__tweet">
                <textarea 
                    v-model="appData.tweetDesc"
                    rows="3" 
                    cols="3" 
                    class="form-control border-0" 
                    placeholder="What's happening?"></textarea>
                <button @click="postTweat" class="kw-button --pill --blue --color-white">Tweet</button>
            </div>            
        </div>
    </div>
</template>
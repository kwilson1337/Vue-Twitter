<script setup lang="ts">
// methods 
import { computed, onMounted, reactive } from 'vue'
import { getFirestore, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore'
import { useGetSingleDocument } from "@/composables/firebaseHelpers"
import { firebaseStorage } from '@/firebase/init';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//components
import BackArrow from './BackArrow.vue';

// store
import { useCurrentUser } from '@/stores/CurrentUser';
const userStore = useCurrentUser();

// logic
const currentUsers = userStore.state
const db = getFirestore()

const props = defineProps<{
    tweetCount?: number | undefined
}>();

const appData: {
    bio: string | number | string[] | undefined
    editProfile: boolean
    uploadProgress: number
    profileImage: string
    bannerImage: string
} = reactive({
    bio: '',
    editProfile: false,
    uploadProgress: 0,
    profileImage: '',
    bannerImage: ''
})

const formatHandle = computed(() => {
    if(currentUsers.displayName) return `@${currentUsers.displayName.toLocaleLowerCase().replace(/\s/g, "")}`
    
    return
})

const toggleEditProfile = () => {
    appData.editProfile = !appData.editProfile    
}

const getProfileImage = (e: HTMLInputElement) => {
    const file = e.target.files[0]
    
    if(file) {
        const storage = ref(firebaseStorage, `/images/${file.name}`)
        const uploadTask = uploadBytesResumable(storage, file)

        uploadTask.on('state_changed', (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            appData.uploadProgress = progress
        }, 
        (err) => console.log(err),
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (image) => {
                // set to user 
                const docRef = doc(db, "users", currentUsers.userID);
                const docSnap = await getDoc(docRef);
                const imageData = {
                    profileImage: image
                }

                if(docSnap.exists()) {
                    await updateDoc(docRef, imageData)     
                    currentUsers.profileImage = image               
                } else {
                    await setDoc(docRef, imageData)
                    currentUsers.profileImage = image
                }
            })
        })
    }
}

const getPersonBannerImage = (e: HTMLInputElement) => {
    const file = e.target.files[0] 

    if(file) {
        const storage = ref(firebaseStorage, `/images/${file.name}`)
        const uploadTask = uploadBytesResumable(storage, file)

        uploadTask.on('state_changed', (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            appData.uploadProgress = progress
        }, 
        (err) => console.log(err),
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (image) => {
                // set to user 
                const docRef = doc(db, "users", currentUsers.userID);
                const docSnap = await getDoc(docRef);
                const imageData = {
                    bannerImage: image
                }

                if(docSnap.exists()) {
                    await updateDoc(docRef, imageData)      
                    appData.bannerImage = image                     
                } else {
                    await setDoc(docRef, imageData)                    
                    
                }
            })
        })
    }
}

const joinedOn = computed(() => {
    const date = new Date(currentUsers.joinedOn)
    const month =  date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear()

    return `Joined on ${month} ${year}`
})

const getUserInfo = async () => {           
    const getCollectionDataBio = useGetSingleDocument('users', currentUsers.userID, "bio")
    const getCollectionDataProfileImage = useGetSingleDocument('users', currentUsers.userID, 'profileImage')     
    const getCollectionDataBannerImage = useGetSingleDocument('users', currentUsers.userID, 'bannerImage')
    
    Promise.all([
        getCollectionDataBio,
        getCollectionDataProfileImage,
        getCollectionDataBannerImage
    ])
    .then((info) => {
        //bio 
        userStore.state.bio = info[0]
        appData.bio = info[0]

        // profile image
        userStore.state.profileImage = info[1]
        appData.profileImage = info[1]

        // banner image
        appData.bannerImage = info[2]
    })   
}

// add bio
const postBio = async () => {
    const docRef = doc(db, "users", currentUsers.userID);
    const docSnap = await getDoc(docRef);
    const bioData = {
        bio: appData.bio
    }
    
    if(docSnap.exists()) {
        await updateDoc(docRef, bioData)
    } else {
        await setDoc(docRef, bioData);     
    }    

    await getUserInfo()    
    toggleEditProfile()       
}

onMounted(() => {     
    getUserInfo()
})  
</script>

<template>    
    <section class="profile-header">        
        <BackArrow 
            :name="currentUsers.displayName ? currentUsers.displayName : currentUsers.emailAddy"
            :tweet-count="props.tweetCount"
        />        
        <div 
            class="profile-header__img --bg-cover"
            :class="[appData.bannerImage ? '--hover' : '']"
            :style="[appData.bannerImage ? `background-image:url(${appData.bannerImage})` : ``]"
        >                    
            <span class="kw-button --pill --blue --color-white">
                <span v-if="appData.bannerImage">Edit banner image</span>
                <span v-else>Add banner image</span>                
                <input @change="getPersonBannerImage" type="file" />
            </span>
        </div>

        <div class="container">
            <div class="profile-header__profile">                
                <div class="profile-img">                                        
                    <img 
                        :src="currentUsers.profileImage" 
                        :alt="currentUsers.displayName" 
                        referrerpolicy="no-referrer" 
                        class="img-fluid"
                    >
                    
                    <button>                        
                        <input @change="getProfileImage" type="file" />
                        <i class="fa-regular fa-plus"></i>
                    </button>

                    <span v-if="appData.uploadProgress > 0">
                        {{ appData.uploadProgress }}
                    </span>
                </div>

                <div class="edit-profile">
                    <button @click="toggleEditProfile" class="kw-button --pill --ghost --color-black">Edit profile</button>
                </div>
            </div>

            <div class="profile-header__content">
                <p class="h2 mb-2 --line-height-100">{{ currentUsers.displayName }}</p>
                <p class="mb-0 --fs-13">{{ formatHandle }}</p>                              
                <div class="mt-3 bio">
                    <div class="w-50">
                        <p v-if="userStore.state.bio">{{ userStore.state.bio }}</p>
                        <div v-if="appData.editProfile">
                            <textarea 
                                v-model="appData.bio" 
                                class="form-control"
                                rows="2"
                                :disabled="!appData.editProfile"
                            ></textarea>
                            <div class="mt-3 text-end">
                                <button
                                    @click="toggleEditProfile"
                                    class="kw-button --pill --black --color-white me-2"
                                >
                                    Cancel
                                </button>

                                <button 
                                    @click="postBio"
                                    class="kw-button --pill --ghost --color-black"
                                >
                                    <span v-if="!userStore.state.bio">Add bio</span>                            
                                    <span v-if="userStore.state.bio">Update bio</span>
                                </button>                                
                            </div>
                        </div>                        
                    </div>                    
                </div>

                <div class="mt-3">
                    <p class="--fs-13 --color-color2"><i class="fa-regular fa-calendar-days"></i> {{ joinedOn }}</p>  
                </div>
            </div>
        </div>
    </section>
</template>
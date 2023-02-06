import { defineStore } from 'pinia'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useGetSingleDocument } from "@/composables/firebaseHelpers"

export interface UserCollection {
    userID?: string | undefined,
    bio?: string  
}

export interface User extends UserCollection {
    isLoggedIn: boolean        
    displayName: string | undefined | null | any
    emailAddy: string | null
    profileImage: string | null | any
    joinedOn: string | undefined 
}


export const useCurrentUser = defineStore('currentUser', () => {        
    
    const state: Ref<User> = ref({        
        isLoggedIn: false,
        userID: '',
        displayName: '',
        emailAddy: '',
        profileImage: '',
        joinedOn: ''
    })

    const getProfileImage = async (id: string | undefined, fallback: string | null) => {
        const profileImage = await useGetSingleDocument('users', id, 'profileImage')
        if(profileImage) {
            state.value.profileImage = profileImage
        } else {
            state.value.profileImage = fallback
        }        
    }

    const getCurrentUser = new Promise((resolve, reject) => {
        onAuthStateChanged(getAuth(), (user) => {                                                
            if(user) {                
                // set up user                
                state.value.isLoggedIn = true
                state.value.displayName = user.displayName ? user.displayName : user.email
                state.value.profileImage = user.photoURL   
                state.value.userID = user.uid 
                state.value.joinedOn = user.metadata.creationTime      
                state.value.emailAddy = user.email
                
                // profile image
                getProfileImage(user.uid, user.photoURL)
                                
                resolve(user)
            } else {
                state.value.isLoggedIn = false
                state.value.displayName = ''
                state.value.profileImage = ''   
                state.value.userID = '' 
                state.value.joinedOn = ''      
                  
                reject()
            }
        })       
    })

    return {
        state,
        getCurrentUser,
    }
})
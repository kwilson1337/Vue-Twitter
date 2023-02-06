<script setup lang="ts">
import { onMounted } from 'vue';
import { useCurrentUser } from '@/stores/CurrentUser';
import Logo from '../Logo/Logo.vue';
import LogOut from '../RegisterLogin/buttons/LogOut.vue';
import { RouterLink } from 'vue-router'

const userStore = useCurrentUser()
const currentUser = userStore.state
</script>

<template>
    <header class="header">
        <div class="header__inner">
            <Logo />                  
        
            <nav class="header__links">   
                <RouterLink
                    v-if="currentUser.isLoggedIn"
                    to="/home"
                >
                    <div class="kw-button --ghost --icon">
                        <i class="fa-regular fa-house-user"></i>
                        <span>Home</span>
                    </div>
                </RouterLink>

                <RouterLink to="/">
                    <div class="kw-button --ghost --icon">
                        <i class="fa-regular fa-hashtag"></i>
                        <span>Explore</span>
                    </div>
                </RouterLink>

                <RouterLink 
                    v-if="currentUser.isLoggedIn"
                    to="/profile"
                >
                    <div class="kw-button --ghost --icon">
                        <i class="fa-regular fa-user"></i>
                        <span>Profile</span>
                    </div>
                </RouterLink>
                                
                <RouterLink 
                    v-if="!currentUser.isLoggedIn"
                    to="/settings"
                >
                    <div class="kw-button --ghost --icon">
                        <i class="fa-light fa-gear"></i> 
                        <span>Settings</span>
                    </div>
                </RouterLink>   
                               
                <a href="##">
                    <LogOut 
                        v-if="currentUser.isLoggedIn"
                        :class-names="['--ghost', '--icon']"
                        :icon="true"
                    />  
                </a>              
            </nav>
        </div>   
    </header>
</template>
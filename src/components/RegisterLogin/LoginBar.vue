<script setup>
    import { useLoginRegister } from "@/stores/LoginRegister";
    import { useCurrentUser } from '@/stores/CurrentUser';
    import Modal from "./Modal.vue";
    import SignInButton from './buttons/SignInButtonModal.vue';       
    import RegisterButton from './buttons/RegisterButtonModal.vue';

    const store = useLoginRegister();        
    const userStore = useCurrentUser();    
</script>

<template>
    <Modal 
        :is-active="store.state.activeModal"
        @closeModal="store.state.activeModal = false" 
        :action-type="store.state.view"       
    />

    <div 
        v-if="!userStore.state.isLoggedIn"
        class="login-bar"
    >        
        <div class="container">            
            <div class="login-bar__flex">
                <div class="login-bar__left">
                    <p class="h3 mb-0">Don't miss what's happening</p>                    
                    <p class="mb-0">People on Twitter are the first to know.</p>
                </div>

                <div class="login-bar__right">
                    <div class="login-bar__actions">
                        <SignInButton 
                            :classNames="['--pill', '--ghost']"
                        />
                        <RegisterButton 
                            :classNames="['--pill']"
                        />
                    </div>
                </div>
            </div>            
        </div>
    </div>
</template>
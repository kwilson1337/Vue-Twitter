<script setup lang="ts">
// librarys
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

// store
import { useLoginRegister } from "@/stores/LoginRegister";
import { useCurrentUser } from "@/stores/CurrentUser"

// components
import SignInGoogl from "./buttons/SignInGoogle.vue";

const modalStore = useLoginRegister();
const userStore = useCurrentUser();

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const auth = getAuth();

const register = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
        console.log('signed in succefully')
        router.push('/home');

        // close modal
        modalStore.state.activeModal = false
    })
    .catch((err) => {
        console.log(err.code)         

        switch(err.code) {
            case "auth/invalid-email": 
                errorMessage.value = "Invalid email";
                break;
            case "auth/user-not-found":
                errorMessage.value = "User not found";
                break;
            case "auth/wrong-password":
                errorMessage.value = "Wrong password";
                break;
            default:
                errorMessage.value = "Email or password incorrect";
                break;
        }        
    })
}

const showForm = ref(false)
const togglePasswordForm = () => {
    showForm.value = !showForm.value
}
</script>

<template>
    <div class="register-login p-4">
        <div class="container text-center">
            <p class="h3 fw-bold">Sign in to Twitter</p>            
            <p v-if="errorMessage">{{ errorMessage }}</p>
            
            <div class="register-login__type --password mt-4">
                <button @click="togglePasswordForm" class="kw-button --pill --color-black w-50 --ghost">Sign in with Password</button>
            </div>
            <div v-if="!showForm" class="register-login__type --google mt-4">
                <SignInGoogl 
                    :class-names="['kw-button', '--pill', '--ghost', '--color-black', 'w-50']"
                />                
            </div>

            <div v-if="showForm" class="sign-up-form mt-3">
                <input v-model="email" type="text" class="form-control p-3" placeholder="Email">
                <input v-model="password" type="password" class="form-control p-3 mt-3" placeholder="Password">

                <div class="text-start mt-3">
                    <button @click="register" class="kw-button --pill --black">Submit</button>     
                    <button @click="togglePasswordForm" class="kw-button --pill --black ms-3">Cancel</button>
                </div>                           
            </div>
          
            <div class="register-login__footer mt-5">
                <p class="mb-0 --color-color2">Don't have an account? 
                    <a 
                        href="##" 
                        data-type="register" 
                        class="--color-color1"
                        @click="modalStore.detectFormType($event)"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    </div>
</template>
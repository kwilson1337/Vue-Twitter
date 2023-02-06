<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router";
import type { Ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from 'firebase/auth'
import { useLoginRegister } from "@/stores/LoginRegister"
import SignInGoogle from "./buttons/SignInGoogle.vue";

const store = useLoginRegister();
const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const router = useRouter();

const showForm: Ref<boolean> = ref(false)
const togglePasswordForm = () => {
    showForm.value = !showForm.value
}

const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
        console.log('signed in succefully')
        router.push('/explore');
    })
    .catch((err) => {
        console.log(err)
        alert(err.message)
        router.push('/settings')
    })
}
</script>

<template>
    <div class="register-login p-4">
        <div class="container text-center">
            <p class="h3 fw-bold">Register</p>

            <div class="register-login__type --password mt-4">
                <button @click="togglePasswordForm" class="kw-button --pill --color-black w-50 --ghost">Sign in with Password</button>
            </div>
            <div v-if="!showForm" class="register-login__type --google mt-4">
                <SignInGoogle 
                    :class-names="['kw-button', '--pill', '--ghost', '--color-black', 'w-50']"
                />                
            </div>

            <div v-if="showForm" class="sign-up-form mt-3">
                <input v-model="email" type="text" class="form-control p-3" placeholder="Email">
                <input v-model="password" type="password" class="form-control p-3 mt-3" placeholder="Password">

                <div class="text-start mt-3">
                    <button @click="register" class="kw-button --pill --black">Submit</button>
                </div>                                
            </div>
            
            <div class="register-login__footer mt-5">
                <p class="mb-0 --color-color2">Have an account already?
                    <a 
                        href="##" 
                        data-type="login" 
                        class="--color-color1"
                        @click="store.detectFormType($event)"
                    >
                        Log in
                    </a>
                </p>
            </div>
        </div>
    </div>
</template>
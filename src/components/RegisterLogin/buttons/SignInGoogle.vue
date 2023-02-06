<script setup lang="ts">
import { getAuth, GoogleAuthProvider, signInWithPopup  } from 'firebase/auth'
import { useRouter } from "vue-router";
import { useLoginRegister } from '@/stores/LoginRegister';

const props = withDefaults(defineProps<{
    classNames?: string[]
}>(), {
    classNames: () => ['kw-button']
})

const router = useRouter()
const store = useLoginRegister();

const withGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(getAuth(), provider)
    .then((result) => {
        console.log(result.user)
        router.push('/home')
        store.state.activeModal = false
    })
    .catch((err) => {
        console.log(err)
    })
}
</script>

<template>    
    <button @click="withGoogle" :class="props.classNames">Sign in with google</button>
</template>
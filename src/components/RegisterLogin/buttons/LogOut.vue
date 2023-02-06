<script setup lang="ts">
import { useRouter } from "vue-router";
import { getAuth, signOut } from 'firebase/auth'
const router = useRouter();

const props = withDefaults(defineProps<{
    copy?: string;
    icon: boolean;
    classNames: string[]
}>(), {
    copy: "Logout",
    icon: false,
    classNames: () => []
})

const handleSignOut = () => {
    signOut(getAuth()).then(() => {
        router.push('/')
    })
}
</script>

<template>
    <div 
        class="kw-button"
        :class="props.classNames"
        @click="handleSignOut"
    >
        <i v-if="props.icon" class="fa-regular fa-arrow-right-from-bracket"></i>
        <span>{{ props.copy }}</span>
    </div>
</template>
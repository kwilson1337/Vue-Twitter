<script setup lang="ts">
    import { useLoginRegister } from "@/stores/LoginRegister";
    const store = useLoginRegister()

    const props = withDefaults(defineProps<{
        classNames: string[]
    }>(), {
        classNames: () => ['kw-button']
    })
</script>

<template>
    <button 
        @click="store.toggleModal($event)" 
        data-type="register" 
        class="kw-button"
        :class="props.classNames"
    >
        Sign up
    </button>
</template>
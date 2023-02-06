<script setup lang="ts">
    import { useLoginRegister } from "@/stores/LoginRegister";
    const store = useLoginRegister()

    const props = withDefaults(defineProps<{
        classNames?: string[]
        copy?: string
    }>(), {
        classNames: () => ['kw-button'],
        copy: "Login"
    })
</script>

<template>
    <button 
        @click="store.toggleModal($event)" 
        data-type="login" 
        class="kw-button"
        :class="props.classNames"
        >
            {{ props.copy }}
        </button>
</template>
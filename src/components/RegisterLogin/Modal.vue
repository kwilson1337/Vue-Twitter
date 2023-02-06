<script setup lang="ts">
    import Logo from '../Logo/Logo.vue';
    import RegisterLoginVue from './RegisterLogin.vue';
    import SignInVue from './SignIn.vue';        

    const props = withDefaults(defineProps<{
        isActive: boolean,
        actionType?: string
    }>(), {
        isActive: false
    });

    const emit = defineEmits<{
        (e: 'closeModal'): void
    }>();

    const closeModal = () => {
        emit("closeModal");
    }
</script>

<template>
    <div 
        class="kw-modal"
        :class="[props.isActive ? '--active' : '']"
    >
        <div class="kw-modal__inner">
            <div class="kw-modal__content">
                <div class="kw-modal__close">
                    <button @click="closeModal">
                        <i class="fa-regular fa-xmark"></i>
                    </button>
                </div>

                <div class="kw-modal__logo text-center">
                    <Logo 
                        class="pt-2"
                        :link="false"
                    />
                </div>

                <div v-if="props.actionType === 'register'" class="kw-modal__form">
                    <RegisterLoginVue />
                </div>

                <div v-if="props.actionType === 'login'" class="kw-modal__form">
                    <SignInVue />
                </div>
            </div>  
        </div>
    </div>
</template>
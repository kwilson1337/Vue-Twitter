<script setup lang="ts">
    import SignInButton from './buttons/SignInButtonModal.vue';
    import SignInGoogle from './buttons/SignInGoogle.vue';
</script>

<template>
    <div class="side-bar-login --border-all">
        <div class="side-bar-login__inner">
            <p class="h2 mb-0">New to Twitter?</p>
            <p class="--fs-13 --color-color2">Sign up now to get your own personalized timeline!</p>

            <div class="side-bar-login__buttons mt-4">

                <SignInButton 
                    :class-names="['--pill', '--ghost', 'w-100', '--color-black']"
                    copy="Sign up with phone or email"
                />

                <SignInGoogle 
                    :class-names="['--pill', '--ghost', '--color-black', 'w-100', 'kw-button', 'mt-3']"
                />
            </div>
        </div>
    </div>
</template>
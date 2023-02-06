<script setup lang="ts">
import { RouterLink } from 'vue-router';
const props = defineProps<{
    name: string | undefined | null;
    tweetCount?: number | undefined;
}>()
</script>

<template>
    <div class="back-arrow py-3">
        <div class="container">
            <div class="back-arrow__flex d-flex align-items-center">
                <RouterLink to="/">
                    <i class="fa-regular fa-arrow-left-long --color-black"></i>
                </RouterLink>    

                <div class="ps-4">
                    <p v-if="props.name" class="h2 mb-0 --line-height-100">{{ props.name }}</p>
                    <p v-if="props.tweetCount" class="--line-height-100 mt-2 mb-0 --color-color2">{{ props.tweetCount }} Tweets</p>
                </div>
            </div>
        </div>
    </div>
</template>
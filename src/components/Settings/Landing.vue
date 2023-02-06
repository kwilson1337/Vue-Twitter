<script lang="ts" setup>
import { reactive } from 'vue';

export interface Props {
    pageTitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
    pageTitle: "Settings"        
})
</script>

<template>
    <div class="settings-landing">
        <div class="container">
            <div class="col-md-5">
                <div class="settings-landing__left">
                    <div class="settings-landing__section-title">
                        <h2>{{ props.pageTitle }}</h2>

                        <div class="settings-landing__section">
                            <p class="h2 pt-2">Privacy</p>
                        </div>

                        <div style="margin: 0px -30px;" class="settings-landing__section --border-top">
                            <p class="h2 pt-2">Privacy</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-7">
                <div class="settings-landing__right">

                </div>
            </div>
        </div>
    </div>
</template>
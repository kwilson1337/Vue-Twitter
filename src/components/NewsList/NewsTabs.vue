<script setup lang="ts">  
    const emits = defineEmits<{
        (e: 'toggleNews', type: string): void        
    }>()

    const props = withDefaults(defineProps<{
        isSelected: string,
        tabs: {
            type: string,
            label: string
        }[]       
    }>(), {
        isSelected: "news"
    })

    const toggleNews = (e: { target: any }) => {
        const type:string | any = e.target.dataset.type
        emits("toggleNews", type);        
    }       
</script>

<template>
    <nav class="news-tabs --border-bottom">
        <ul class="news-tabs__flex">
            <li 
                v-for="(single, i) in props.tabs"
                :key="single.type"
                class="news-tabs__single" 
                :class="[props.isSelected === single.type ? '--active' : '']"
                :data-type="single.type"
                @click="toggleNews($event)"
            >
                {{ single.label }}
            </li>            
        </ul>
    </nav>
</template>
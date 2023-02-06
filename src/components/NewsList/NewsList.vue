<script setup lang="ts">    
    import { computed } from "vue"    

    import { useNewsApi } from "@/stores/NewsApi";    
    import NewsItem from "./NewsItem.vue";
    const store = useNewsApi();    
                 
    // Get default news
    const getNews = computed(() => {
        if(store.state.news.length) {            
            return store.state.news
        }

        return store.getNews('general')
    })    
</script>

<template>
    <section class="news-list">                
        <NewsItem 
            :newsItem="getNews"                                
        />
    </section>
</template>
<script setup lang="ts">        
    import { ref, computed } from "vue"
    import type { Ref } from 'vue'

    import NewsTabs from "./NewsTabs.vue";
    import { useNewsApi } from "@/stores/NewsApi";
    const store = useNewsApi()
    
    // Toggle selected tab
    const isSelected: Ref<string> = ref('general')

    // Get News on click
    const getNews = (news: string) => {        
        store.getNews(news)
        isSelected.value = news
        store.state.searchInput = ''
    }        
    
    const tabs = [
        { type: "general", label: "News" },
        { type: "sports", label: "Sports" },
        { type: "entertainment", label: "Entertainment" },
        { type: "technology", label: "Tech" },
    ]
</script>

<template>
    <div class="search-form --border-left --border-right">
        <div class="search-form__inner">
            <input 
                type="text" 
                placeholder="Search Twiter" 
                @keyup="store.filterNews()" 
                v-model="store.state.searchInput" 
                class="form-control"
            >
            <span><i class="fa-light fa-magnifying-glass"></i></span>
        </div>        

        <NewsTabs 
            class="mt-3"
            @toggleNews="getNews"
            :isSelected="isSelected"
            :tabs="tabs"
        />
    </div>
</template>
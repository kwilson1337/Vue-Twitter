<script setup lang="ts">
import NewsListActions from './NewsListActions.vue';
import type { Ref } from 'vue';
import { ref } from 'vue'

interface News {
    newsItem: {
        id: string;
        name: string;
        category: string;
        url: string;
        description: string;
    }
}

const props = defineProps<{
    newsItem: News,    
}>()

// toggle menu
const toggleDescMenu: Ref<string[] | any> = ref([])
const toggleMenu = (index:string | any) => {
    toggleDescMenu.value[index] = !toggleDescMenu.value[index]
}

// toggle full description
const showFullDesc: Ref<string> = ref('')
const toggleDesc = (index: string) => {
    showFullDesc.value = index    
}

// cut string after 60 characters
const limitDesc = (desc: string) => {
    return desc.substr(0, 60) + '\u2026'
}
</script>

<template>           
    <div 
        v-if="props.newsItem"
        class="news-item"
        v-for="(single, i) in props.newsItem"
        :key="single.id"
        :class="[toggleDescMenu[single.id] ? '--no-click' : '']"
    >        
        <div class="news-item__inner">
            <a :href="single.url" target="_blank">
                <div class="content">                    
                    <p class="mb-0 --color-color2 --fs-13">Trending in {{ single.category }}</p>  
                    <p class="title mb-0 fw-bold">{{ single.name }}</p>

                    <!-- preview -->
                    <p v-if="showFullDesc !== single.id" class="--fs-13 mb-0">
                        {{ limitDesc(single.description) }}
                    </p>            
                    
                    <!-- full description -->
                    <p v-if="showFullDesc === single.id">
                        {{ single.description }}
                    </p>                    
                </div>                            
            </a>                   
            <!-- actions -->
            <NewsListActions 
                @click="toggleMenu(single.id)"       
                @showFullDesc="toggleDesc"                         
                :expanded="toggleDescMenu[single.id]"                
                :index="single.id" 
                :currentIndex="showFullDesc"           
            />
        </div>        
    </div>
</template>
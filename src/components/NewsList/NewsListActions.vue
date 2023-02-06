<script setup lang="ts">
    const props = withDefaults(defineProps<{
        expanded?: boolean
        index: string | any;
        currentIndex?: string;
    }>(), {
        expanded: false
    });

    const emits = defineEmits<{
        (e: 'showFullDesc', index: string): void
    }>();    
        
    const toggleDesc = (index: string) => {   
        if(props.index !== props.currentIndex) {
            emits('showFullDesc', index)        
        } else {            
            index = ''
            emits('showFullDesc', index)
        }            
    }
</script>

<template>
    <div class="news-item__action">           
        <div>
            <i v-if="!props.expanded" class="fa-solid fa-ellipsis"></i>
            <i v-if="props.expanded" class="fa-regular fa-xmark"></i>
        </div>

        <div 
            v-if="props.expanded" 
            class="news-item__pop-up"
            @click="toggleDesc(props.index)"
        >            
            <span v-if="props.currentIndex !== props.index" class="fw-700">Expand News Description</span>
            <span v-else>Hide Full Description</span>
        </div>
    </div>
</template>
<script setup lang="ts">
import SearchForm from '@/components/NewsList/SearchForm.vue';
import NewsList from '@/components/NewsList/NewsList.vue';
import SideBar from '@/components/RegisterLogin/SideBar.vue';
</script>

<template>
    <div class="row">
        <div class="col-md-7 --border-right">
            <SearchForm />
            <NewsList />
        </div>

        <div class="col-md-5">
            <SideBar />
        </div>
    </div>    
</template>
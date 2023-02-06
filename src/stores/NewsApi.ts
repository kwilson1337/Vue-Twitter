import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useNewsApi = defineStore('newsApi', () => {  
  
  const state = reactive({
    apiKey: "96aa7e71381f490e8a4ba03902c0230c",        
    news: [],    
    oldNews: [],
    searchInput: ''
  });

  const getNews = async (news: string) => {        
    const data = await axios.get(`https://newsapi.org/v2/top-headlines/sources?category=${news}&language=en&apiKey=${state.apiKey}`);
    state.news = data.data.sources;        
    state.oldNews = data.data.sources;        
  }
 
  const filterNews = () => {    
    // set old list        
    if(!state.searchInput || state.searchInput == '') state.news = state.oldNews
        
    // set filtered list
    const filteredList = state.news.filter(single => single.name.toLowerCase().includes(state.searchInput))         
    state.news = filteredList
  }
  return { 
    state, 
    getNews, 
    filterNews 
  };
})

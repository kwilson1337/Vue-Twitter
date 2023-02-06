import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

interface State {
    activeModal: boolean;
    view: string;
}

export const useLoginRegister = defineStore('loginRegister', () => {    
    const state: Ref<State> = ref({
        activeModal: false,
        view: '',        
    });

    const detectFormType = (e) => {
        state.value.view = e.target.dataset.type
    }

    const toggleModal = (e) => {
        state.value.activeModal = !state.value.activeModal        
        detectFormType(e)
    }   
    
    return {
        state,
        toggleModal, 
        detectFormType       
    }
})
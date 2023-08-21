import { defineStore } from "pinia";

export const useCartStore = defineStore('movents', {
    state: () => ({
        movent: false,
        filters: {}
    }),
    getters: {
        getMovements: (state) => {
            return state.movent
        },
        getFilterMov: (state) => {
            return state.filters;
        }
    },
    actions: {
        addInputMovents(param) {
            this.movent = param;
        },
        setFilter(param) {
            this.filters = param;
        }
    }
})
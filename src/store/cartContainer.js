import { defineStore } from "pinia";
import { useAsync } from "../hooks/useAsync";

export const useCartStore = defineStore('moment', {
    state: () => ({
        moment: false,
        filters: {}
    }),
    getters: {
        getMovements: (state) => {
            return state.moment
        },
        getFilterMov: (state) => {
            return state.filters;
        }
    },
    actions: {
        addInputMovents(param) {
            this.moment = param;
        },
        setFilter(param) {
            this.filters = param;
        }
    }
})
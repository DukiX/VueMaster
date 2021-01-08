export default({
    namespaced:true,
    state: {
        basket:[]
    },
    mutations: {
        ADD_TO_BASKET(state,item){
            state.basket.push(item);
        },
        REMOVE_FROM_BASKET(state,id){
            state.basket = state.basket.filter(item=>item.id != id);
        },
        EMPTY_BASKET(state){
            state.basket = [];
        }
    },
    actions: {
        addToBasket({commit},item){
            commit('ADD_TO_BASKET',item);
        },
        removeFromBasket({commit},id){
            commit('REMOVE_FROM_BASKET',id);
        },
        emptyBasket({commit}){
            commit('EMPTY_BASKET');
        }
    },
    getters : {
        getBasket:state=>state.basket
    }
})

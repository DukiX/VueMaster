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
            state.basket = state.basket.filter(item=>item.id == id);
        }
    },
    actions: {
        addToBasket({commit},item){
            commit('ADD_TO_BASKET',item);
        },
        removeFromBasket({commit},id){
            commit('REMOVE_FROM_BASKET',id);
        }
    },
    getters : {
        getBasket:state=>state.basket
    }
})

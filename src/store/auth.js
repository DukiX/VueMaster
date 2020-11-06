export default({
    namespaced:true,
    state: {
        token:null,
        user:null,
        refreshToken:null
    },
    mutations: {
        SET_TOKEN(state,token){
            state.token=token
        },
        SET_USER_DATA(state,userData){
            state.user=userData
        },
        SET_REFRESH_TOKEN(state,refreshToken){
            state.refreshToken=refreshToken
        }
    },
    actions: {
        signIn({dispatch},tokens){
            dispatch('attemptSignIn',tokens)
        },

        attemptSignIn({commit},tokens){
            commit('SET_TOKEN',tokens.token);
            commit('SET_REFRESH_TOKEN',tokens.refreshToken);
        },

        async saveUserData({dispatch},userData){
            dispatch('attemptSaveUserData',userData)
        },

        attemptSaveUserData({commit},userData){
            commit('SET_USER_DATA',userData)
        },

        async signOut({dispatch}){
            dispatch('attemptSignOut')
        },

        attemptSignOut({commit}){
            commit('SET_TOKEN',null),
            commit('SET_REFRESH_TOKEN',null)
        },

        async saveRefreshToken({dispatch},refreshToken){
            dispatch('attemptSaveRefreshToken',refreshToken)
        },

        attemptSaveRefreshToken({commit},refreshToken){
            commit('SET_REFRESH_TOKEN',refreshToken)
        },
    },
    getters : {
        isLoggedIn: state => !!state.token,
        getToken: state => state.token,
        getRefreshToken: state => state.refreshToken
    }
})

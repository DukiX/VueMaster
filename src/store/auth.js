export default({
    namespaced:true,
    state: {
        token:null,
        user:null,
        refreshToken:null,
        userAvatar:null
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
        },
        SET_USER_IMAGE(state,image){
            state.userAvatar=image
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

        saveUserData({dispatch},userData){
            dispatch('attemptSaveUserData',userData)
        },

        attemptSaveUserData({commit},userData){
            commit('SET_USER_DATA',userData)
        },

        signOut({dispatch}){
            dispatch('attemptSignOut')
        },

        attemptSignOut({commit}){
            commit('SET_TOKEN',null),
            commit('SET_REFRESH_TOKEN',null),
            commit('SET_USER_IMAGE',null)
        },

        saveRefreshToken({dispatch},refreshToken){
            dispatch('attemptSaveRefreshToken',refreshToken)
        },

        attemptSaveRefreshToken({commit},refreshToken){
            commit('SET_REFRESH_TOKEN',refreshToken)
        },

        saveUserImage({dispatch},image){
            dispatch('attemptSaveUserImage',image)
        },

        attemptSaveUserImage({commit},image){
            commit('SET_USER_IMAGE',image)
        }
    },
    getters : {
        isLoggedIn: state => !!state.token,
        getToken: state => state.token,
        getRefreshToken: state => state.refreshToken,
        getUser: state => state.user,
        getUserAvatar:state=>state.userAvatar
    }
})

export default({
    namespaced:true,
    state: {
        user:null,
        refreshToken:null,
        userAvatar:null,
        loginData:null
    },
    mutations: {
        SET_SIGNIN_DATA(state,loginData){
            state.loginData=loginData
        },
        SET_USER_DATA(state,userData){
            state.user=userData
        },
        SET_USER_IMAGE(state,image){
            state.userAvatar=image
        }
    },
    actions: {
        signIn({dispatch},loginData){
            dispatch('attemptSignIn',loginData)
        },

        attemptSignIn({commit},loginData){
            commit('SET_SIGNIN_DATA',loginData);
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
            commit('SET_SIGNIN_DATA',null),
            commit('SET_USER_IMAGE',null)
        },

        saveUserImage({dispatch},image){
            dispatch('attemptSaveUserImage',image)
        },

        attemptSaveUserImage({commit},image){
            commit('SET_USER_IMAGE',image)
        }
    },
    getters : {
        isLoggedIn: state => {
            if(state.loginData==null)
                return false;
            else return !!state.loginData.accessToken;
        },
        getToken: state => {
            if(state.loginData==null)
                return null;
            else return state.loginData.accessToken;
        },
        getRefreshToken: state => {
            if(state.loginData==null)
                return null;
            else return state.loginData.refreshToken;
        },
        getUserRole: state => {
            if(state.loginData==null)
                return null;
            else return state.loginData.userRole;
        },
        getUser: state => state.user,
        getUserAvatar:state=>state.userAvatar
    }
})

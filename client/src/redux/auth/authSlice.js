import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name:'auth',
    initialState:{
        loading:false,
        user:null,
        isCheckingAuth:true,
        isSigningUp:false,
        isLoggingIn:false,
        isSearchActive:false,
        isprofilePicLoading:false,
        isPasswordLoading:false,
        isProfileLoading:false,
    },
    reducers:{
        setLoading:(state,action) => {
            state.loading = action.payload;
        },
        setUser:(state,action) => {
            state.user = action.payload;
        },
        setIsCheckingAuth:(state,action) => {
            state.isCheckingAuth = action.payload;
        } ,
        setIsSigningUp:(state,action) => {
            state.isSigningUp = action.payload;
        },
        setIsLoggingIn:(state,action) => {
            state.isLoggingIn = action.payload;
        },
        setIsSearchActive:(state,action) => {
            state.isSearchActive = action.payload;
        },
        setIsprofilePicLoading:(state,action) => {
            state.isprofilePicLoading = action.payload;
        },
        setIsPasswordLoading:(state,action) => {
            state.isPasswordLoading = action.payload;
        },
        setIsProfileLoading:(state,action) => {
            state.isProfileLoading = action.payload;
        },
    },
});

export const {
    setLoading,
    setUser,
    setIsCheckingAuth,
    setIsSigningUp,
    setIsLoggingIn,
    setIsSearchActive,
    setIsprofilePicLoading,
    setIsPasswordLoading,
    setIsProfileLoading
} = authSlice.actions;
export default authSlice.reducer;
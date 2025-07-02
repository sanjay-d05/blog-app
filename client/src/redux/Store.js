import {combineReducers,configureStore} from '@reduxjs/toolkit';

import authSlice from './auth/authSlice';
import blogSlice from './blog/blogSlice';
import commentSlice from './comment/commentSlice';

import {
    persistReducer ,
    FLUSH,
    REHYDRATE ,
    PAUSE ,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key:'root',
    version:1,
    storage
}

const rootReducers = combineReducers({
    auth:authSlice,
    blog:blogSlice,
    comment:commentSlice
})

const persistedReducer = persistReducer(persistConfig,rootReducers)

const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck:{
                ignoreActions:[FLUSH,REHYDRATE,PAUSE,PURGE,PERSIST,REGISTER],
            },
        }),
})

export default store;
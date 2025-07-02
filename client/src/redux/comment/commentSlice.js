import {createSlice} from '@reduxjs/toolkit';

const commentSlice = createSlice({
    name:'comment',
    initialState:{
        comments:[],
        isPostingComment:false,
    },
    reducers:{
        setComments:(state,action) => {
            state.comments = action.payload;
        },
        setIsPostingComment:(state,action) => {
            state.isPostingComment = action.payload;
        },
    },
});

export const {
    setComments,
    setIsPostingComment
} = commentSlice.actions;
export default commentSlice.reducer;
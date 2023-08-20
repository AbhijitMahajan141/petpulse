import {createSlice,PayloadAction } from '@reduxjs/toolkit'

interface UserState{
    user:string | null
}

const initialState:UserState = {
    user:null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser: (state,action:PayloadAction<string | null>) => { 
            // const user = action.payload;
            // state.user = user;
            state.user = action.payload;
        }
    }
})

export const {setUser} = userSlice.actions // this is to directly use to set the user.

export default userSlice.reducer // this is for the store, so we can import this reducer.
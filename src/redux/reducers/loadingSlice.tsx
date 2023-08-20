import {createSlice,PayloadAction} from '@reduxjs/toolkit'

interface LoadingState{
    loading:boolean
}

const initialState:LoadingState = {
    loading:false,
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers:{
        setLoading: (state,action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    }
})

export const {setLoading} = loadingSlice.actions // this is to directly use to set the user.

export default loadingSlice.reducer // this is for the store, so we can import this reducer.
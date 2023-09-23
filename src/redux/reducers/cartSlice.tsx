import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items:[],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<CartItem>)=>{
            const {id,name,price,quantity} = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            if(existingItem){
                existingItem.quantity += quantity;
                existingItem.price += price;
            }else{
                state.items.push({id,name,price,quantity});
            }
        },

        removeFromCart:(state,action:PayloadAction<string>)=>{
            const itemIdToRemove = action.payload;
            state.items = state.items.filter(item => item.id.toString() !== itemIdToRemove);
        },

        updateCartItemQuantity:(state,action:PayloadAction<{itemId: number; quantity:number}>)=>{
            const {itemId, quantity} = action.payload;
            const itemToUpdate = state.items.find(item => item.id.toString() === itemId.toString());
            if(itemToUpdate){
                itemToUpdate.quantity = quantity;
                
            }
        },

        clearCart:(state) => {
            state.items = []
        }

    }
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
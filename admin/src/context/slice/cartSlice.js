import { createSlice } from "@reduxjs/toolkit";
import { food_list } from "../../assets/assets";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: {},
    foodList: food_list,
    url: "http://localhost:8000",
  },
  reducers: {
    addToCart: (state, action) => {
      const itemId = action.payload;
      if (!state.cartItems[itemId]) {
        state.cartItems[itemId] = 1;
      } else {
        state.cartItems[itemId] += 1;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      if (state.cartItems[itemId]) {
        state.cartItems[itemId] -= 1;
        if (state.cartItems[itemId] <= 0) {
          delete state.cartItems[itemId];
        }
      }
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, setCartItems } = cartSlice.actions;

export default cartSlice.reducer;

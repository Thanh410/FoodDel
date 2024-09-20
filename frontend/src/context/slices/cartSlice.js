import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCartService,
  getCarts,
  getFoods,
  removeFromCartService,
} from "../../services/cartServices";

// Thunk để fetch danh sách thực phẩm
export const fetchFoodList = createAsyncThunk(
  "cart/fetchFoodList",
  async () => {
    const response = await getFoods();
    return response.data.data;
  }
);

// Thunk để fetch danh sách thực phẩm
export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async (itemId) => {
    const response = await addToCartService(itemId);
    return { itemId: itemId, data: response.data.data };
  }
);

export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async (itemId) => {
    const response = await removeFromCartService(itemId);
    return { itemId: itemId, data: response.data.data };
  }
);
// Thunk để tải dữ liệu giỏ hàng
export const loadCartData = createAsyncThunk("cart/loadCartData", async () => {
  const response = await getCarts;
  return response.data.cartData;
});

// Slice cho giỏ hàng
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    foodList: [],
    status: "idle", // idle, loading, succeeded, failed
    cartItems: {},
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodList.fulfilled, (state, action) => {
        state.foodList = action.payload;
      })
      .addCase(loadCartData.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const { itemId } = action.payload;
        state.cartItems[itemId] = (state.cartItems[itemId] || 0) + 1;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        const { itemId } = action.payload;
        state.cartItems[itemId] = (state.cartItems[itemId] || 0) - 1;
      });
  },
});

export const selectTotalCartAmount = (state) => {
  const { cartItems, foodList } = state;
  return Object.keys(cartItems).reduce((total, itemId) => {
    const itemInfo = foodList.find((product) => product._id === itemId);
    return total + (itemInfo ? itemInfo.price * cartItems[itemId] : 0);
  }, 0);
};

// Xuất các actions và reducer
export const { addToCart, removeFromCart, setToken } = cartSlice.actions;
export default cartSlice.reducer;

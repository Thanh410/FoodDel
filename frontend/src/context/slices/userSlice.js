import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginService } from "../../services/userService";
import { removeToken, setToken } from "../../utils/localStorage";

// Thunk để fetch danh sách thực phẩm
export const login = createAsyncThunk("user/login", async (data) => {
  const response = await loginService(data);
  setToken(response.data.token);
  return response.data;
});

const initialState = {
  loading: false,
  user: null,
  error: null,
};

// Slice cho giỏ hàng
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = null;
      removeToken();
      console.log("đăng xuất");
    },
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.foodList = action.payload;
    });
  },
});

// Xuất các actions và reducer
export const { logout, setUserInfo } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,   // user object (with isAdmin)
  token: null   // token string
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user;     // ✅ no nested user.user
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});



export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

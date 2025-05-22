import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  loading: boolean;
  user: any | null;
  error: string | null;
  success: string | null;
}
const initialState: UserState = {
  loading: false,
  user: null,
  error: null,
  success: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = "User fetched!";
    },
    fetchUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = null;
    },
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
});
export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  clearMessages,
} = userSlice.actions;
export default userSlice.reducer;

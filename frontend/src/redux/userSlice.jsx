import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: null,
  },
  reducers: {
    adduser(state, action) {
      state.value = action.payload;
    },
  },
});
export const { adduser } = userSlice.actions;
export default userSlice.reducer;

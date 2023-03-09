import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Color } from "@/components/Shoe/ModelShoe";
const initialState: { value: keyof Color | "" } = { value: "" };

export const activeTypeSlice = createSlice({
  name: "activeType",
  initialState,
  reducers: {
    changeActive: (state, action: PayloadAction<keyof Color | "">): void => {
      state.value = action.payload;
    },
  },
});

export const { changeActive } = activeTypeSlice.actions;
export default activeTypeSlice.reducer;

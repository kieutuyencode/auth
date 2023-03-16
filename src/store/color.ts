import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ModelShoeProps } from "@/components/Shoe/ModelShoe";
import { Color } from "@/components/Shoe/ModelShoe";

const initialState: ModelShoeProps = {
  colors: {
    laces: "#ffffff",
    mesh: "#ffffff",
    caps: "#ffffff",
    inner: "#ffffff",
    sole: "#ffffff",
    stripes: "#ffffff",
    band: "#ffffff",
    patch: "#ffffff",
  },
  colorsTest: {
    laces: "#ffffff",
    mesh: "#ffffff",
    caps: "#ffffff",
    inner: "#ffffff",
    sole: "#ffffff",
    stripes: "#ffffff",
    band: "#ffffff",
    patch: "#ffffff",
  },
};
type Payload = {
  name: keyof Color;
  color: string;
};
export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    changeColor: (state, action: PayloadAction<Payload>): void => {
      state.colors[action.payload.name] = action.payload.color;
    },
    changeColorTest: (state, action: PayloadAction<Payload>): void => {
      state.colorsTest[action.payload.name] = action.payload.color;
    },
  },
});

export const { changeColor, changeColorTest } = colorSlice.actions;
export default colorSlice.reducer;

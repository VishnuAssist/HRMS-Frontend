// src/store/uiSlice.ts
import { createSlice,  } from "@reduxjs/toolkit";
import type {  PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
  sidebarExpanded: boolean; // permanent expanded
  mode: "light" | "dark";
}

const localExpanded = localStorage.getItem("sidebarExpanded");
const localMode = localStorage.getItem("themeMode");

const initialState: UIState = {
  sidebarExpanded: localExpanded ? JSON.parse(localExpanded) : false,
  mode: (localMode as "light" | "dark") ?? "light",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSidebarExpanded(state, action: PayloadAction<boolean>) {
      state.sidebarExpanded = action.payload;
      localStorage.setItem("sidebarExpanded", JSON.stringify(action.payload));
    },
    toggleSidebar(state) {
      state.sidebarExpanded = !state.sidebarExpanded;
      localStorage.setItem("sidebarExpanded", JSON.stringify(state.sidebarExpanded));
    },
    setMode(state, action: PayloadAction<"light" | "dark">) {
      state.mode = action.payload;
      localStorage.setItem("themeMode", action.payload);
    },
    toggleMode(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", state.mode);
    },
  },
});

export const { setSidebarExpanded, toggleSidebar, setMode, toggleMode } = uiSlice.actions;
export default uiSlice.reducer;

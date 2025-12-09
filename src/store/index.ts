// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import employeeReducer from "./slices/EmployeeSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    employee: employeeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import customersReducer from "./customersSlice";
import authReducer from "./authSlice";
import dealsReducer from "./dealsSlice";

export const store = configureStore({
  reducer: {
    customers: customersReducer,
    auth: authReducer,
    deals: dealsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

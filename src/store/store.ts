import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";
import invoiceReducer from "./invoicesSlice";
import missionsReducer from "./missionsSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    invoices: invoiceReducer,
    missions: missionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

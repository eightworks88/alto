import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";
import invoiceReducer from "./invoicesSlice";
import missionsReducer from "./missionsSlice";
import freelanceReducer from "./freelanceSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    invoices: invoiceReducer,
    missions: missionsReducer,
    freelance: freelanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

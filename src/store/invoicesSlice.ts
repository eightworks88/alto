import { createSlice } from "@reduxjs/toolkit";

interface Invoice {
  id: string;
  mission: string;
  freelance: string;
  amount: number;
  period: string;
  status: string;
  dueDate: string;
  paidDate: string | null;
}

interface InvoicesState {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
}

const initialState: InvoicesState = {
  invoices: [],
  loading: false,
  error: null,
};

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    setInvoices: (state, action) => {
      state.invoices = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setInvoices, setLoading, setError } = invoicesSlice.actions;
export default invoicesSlice.reducer;

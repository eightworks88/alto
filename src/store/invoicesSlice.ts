import { createSlice } from "@reduxjs/toolkit";

interface Invoice {
  id: number;
  number: string;
  date: string;
  amount: string;
  status: string;
}

interface InvoiceState {
  invoices: Invoice[];
}

const initialState: InvoiceState = {
  invoices: [],
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setInvoices: (state, action) => {
      state.invoices = action.payload;
    },
  },
});

export const { setInvoices } = invoiceSlice.actions;
export default invoiceSlice.reducer;

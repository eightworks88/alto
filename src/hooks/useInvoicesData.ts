import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setInvoices, setLoading, setError } from "@/store/invoicesSlice";

const fetchInvoices = async () => {
  const res = await fetch("/api/company/invoices");
  if (!res.ok) throw new Error("Erreur lors de la récupération des factures");
  return res.json();
};

export const useInvoicesData = () => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["invoices"],
    queryFn: fetchInvoices,
  });

  useEffect(() => {
    if (query.isLoading) {
      dispatch(setLoading(true));
    }

    if (query.data) {
      dispatch(setInvoices(query.data));
    }

    if (query.error) {
      dispatch(setError(query.error.message));
    }
  }, [query.data, query.isLoading, query.error, dispatch]);

  return query;
};

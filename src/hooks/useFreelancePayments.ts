import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPayments, setLoading, setError } from "@/store/freelanceSlice";

const fetchPayments = async () => {
  const res = await fetch("/api/freelance/payments");
  if (!res.ok) throw new Error("Erreur lors de la récupération des paiements");
  return res.json();
};

export const useFreelancePayments = () => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["freelance-payments"],
    queryFn: fetchPayments,
  });

  useEffect(() => {
    if (query.isLoading) {
      dispatch(setLoading(true));
    }

    if (query.data) {
      dispatch(setPayments(query.data));
    }

    if (query.error) {
      dispatch(setError(query.error.message));
    }
  }, [query.data, query.isLoading, query.error, dispatch]);

  return query;
};

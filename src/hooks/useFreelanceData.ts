import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setAvailableMissions,
  setActiveMissions,
  setPayments,
  setProfile,
  setStats,
  setLoading,
  setError,
} from "@/store/freelanceSlice";

const fetchFreelanceDashboard = async () => {
  const res = await fetch("/api/dashboard");
  if (!res.ok) throw new Error("Erreur lors de la récupération du dashboard");
  return res.json();
};

export const useFreelanceDashboard = () => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["freelance-dashboard"],
    queryFn: fetchFreelanceDashboard,
  });

  useEffect(() => {
    if (query.isLoading) {
      dispatch(setLoading(true));
    }

    if (query.data) {
      dispatch(setAvailableMissions(query.data.availableMissions || []));
      dispatch(setActiveMissions(query.data.activeMissions || []));
      dispatch(setStats(query.data.stats || {}));
    }

    if (query.error) {
      dispatch(setError(query.error.message));
    }
  }, [query.data, query.isLoading, query.error, dispatch]);

  return query;
};

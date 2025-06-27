import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setActiveMissions,
  setCompletedMissions,
  setLoading,
  setError,
} from "@/store/freelanceSlice";

const fetchFreelanceMissions = async () => {
  const res = await fetch("/api/freelance/missions");
  if (!res.ok) throw new Error("Erreur lors de la récupération des missions");
  return res.json();
};

export const useFreelanceMissions = () => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["freelance-missions"],
    queryFn: fetchFreelanceMissions,
  });

  useEffect(() => {
    if (query.isLoading) {
      dispatch(setLoading(true));
    }

    if (query.data) {
      const activeMissions = query.data.filter(
        (m: any) => m.status === "in_progress" || m.status === "upcoming"
      );
      const completedMissions = query.data.filter(
        (m: any) => m.status === "completed"
      );

      dispatch(setActiveMissions(activeMissions));
      dispatch(setCompletedMissions(completedMissions));
    }

    if (query.error) {
      dispatch(setError(query.error.message));
    }
  }, [query.data, query.isLoading, query.error, dispatch]);

  return query;
};

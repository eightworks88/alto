// src/hooks/useDashboardData.ts
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setMissions, setProfiles } from "@/store/dashboardSlice";
import { useEffect } from "react";

const fetchDashboardData = async () => {
  const res = await fetch("/api/dashboard"); // adapte l’URL à ton backend
  if (!res.ok) throw new Error("Erreur serveur");
  return res.json(); // { missions: [], profiles: [] }
};

export const useDashboardData = () => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
  });

  // Effet pour synchroniser avec Redux
  useEffect(() => {
    if (query.data) {
      dispatch(setMissions(query.data.missions));
      dispatch(setProfiles(query.data.profiles));
    }
  }, [query.data, dispatch]);

  return query;
};

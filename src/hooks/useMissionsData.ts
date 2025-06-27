import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setMissions,
  setLoading,
  setError,
  updateMission,
} from "@/store/missionsSlice";

const fetchMissions = async () => {
  const res = await fetch("/api/company/missions");
  if (!res.ok) throw new Error("Erreur lors de la récupération des missions");
  return res.json();
};

const createMission = async (missionData: any) => {
  const res = await fetch("/api/company/missions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(missionData),
  });
  if (!res.ok) throw new Error("Erreur lors de la création de la mission");
  return res.json();
};

export const useMissionsData = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["missions"],
    queryFn: fetchMissions,
  });

  const createMutation = useMutation({
    mutationFn: createMission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["missions"] });
    },
  });

  useEffect(() => {
    if (query.isLoading) {
      dispatch(setLoading(true));
    }

    if (query.data) {
      dispatch(setMissions(query.data));
    }

    if (query.error) {
      dispatch(setError(query.error.message));
    }
  }, [query.data, query.isLoading, query.error, dispatch]);

  return {
    ...query,
    createMission: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
};

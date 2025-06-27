import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setProfile,
  updateProfile,
  setLoading,
  setError,
} from "@/store/freelanceSlice";

const fetchProfile = async () => {
  const res = await fetch("/api/freelance/profile");
  if (!res.ok) throw new Error("Erreur lors de la récupération du profil");
  return res.json();
};

const updateProfileAPI = async (profileData: any) => {
  const res = await fetch("/api/freelance/profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profileData),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour du profil");
  return res.json();
};

export const useFreelanceProfile = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["freelance-profile"],
    queryFn: fetchProfile,
  });

  const updateMutation = useMutation({
    mutationFn: updateProfileAPI,
    onSuccess: (data) => {
      dispatch(updateProfile(data));
      queryClient.invalidateQueries({ queryKey: ["freelance-profile"] });
    },
  });

  useEffect(() => {
    if (query.isLoading) {
      dispatch(setLoading(true));
    }

    if (query.data) {
      dispatch(setProfile(query.data));
    }

    if (query.error) {
      dispatch(setError(query.error.message));
    }
  }, [query.data, query.isLoading, query.error, dispatch]);

  return {
    ...query,
    updateProfile: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
};

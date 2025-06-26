import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useMissionsQuery } from "@/lib/api/company/queries";
import { useMemo } from "react";

export const useFilteredMissions = () => {
  const { data: missions = [], isLoading } = useMissionsQuery();
  const { searchTerm, statusFilter } = useSelector((state: RootState) => state.missions);

  const filteredMissions = useMemo(() => {
    return missions.filter((mission) => {
      const matchesSearch =
        mission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mission.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "all" || mission.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [missions, searchTerm, statusFilter]);

  return { filteredMissions, isLoading };
};

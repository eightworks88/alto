import { createSlice } from "@reduxjs/toolkit";

interface Mission {
  id: number;
  title: string;
  status: string;
  budget: string;
  duration: string;
  createdAt: string;
  applicants: number;
  selectedFreelance: string | null;
  progress: number;
}

interface MissionsState {
  missions: Mission[];
  loading: boolean;
  error: string | null;
}

const initialState: MissionsState = {
  missions: [],
  loading: false,
  error: null,
};

const missionsSlice = createSlice({
  name: "missions",
  initialState,
  reducers: {
    setMissions: (state, action) => {
      state.missions = action.payload;
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
    updateMission: (state, action) => {
      const index = state.missions.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.missions[index] = action.payload;
      }
    },
  },
});

export const { setMissions, setLoading, setError, updateMission } =
  missionsSlice.actions;
export default missionsSlice.reducer;

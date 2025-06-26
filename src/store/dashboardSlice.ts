import { createSlice } from "@reduxjs/toolkit";

interface Mission {
  id: number;
  title: string;
  status: string;
  budget: string;
  deadline: string;
  createdAt: string;
}

interface Profile {
  id: number;
  name: string;
  rate: string;
  availability: string;
  skills: string[];
  experience: string;
  missionId: number;
  missionTitle: string;
}

interface DashboardState {
  missions: Mission[];
  profiles: Profile[];
}

const initialState: DashboardState = {
  missions: [],
  profiles: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setMissions: (state, action) => {
      state.missions = action.payload;
    },
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    },
  },
});

export const { setMissions, setProfiles } = dashboardSlice.actions;

export default dashboardSlice.reducer;

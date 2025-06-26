import { createSlice } from "@reduxjs/toolkit";

interface Mission {
  id: number;
  title: string;
  status: string;
  budget: string;
  deadline: string;
  createdAt: string;
}

interface MissionState {
  missions: Mission[];
}

const initialState: MissionState = {
  missions: [],
};

const missionSlice = createSlice({
  name: "mission",
  initialState,
  reducers: {
    setMissions: (state, action) => {
      state.missions = action.payload;
    },
  },
});

export const { setMissions } = missionSlice.actions;
export default missionSlice.reducer;

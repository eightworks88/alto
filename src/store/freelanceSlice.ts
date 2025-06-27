import { createSlice } from "@reduxjs/toolkit";

interface FreelanceMission {
  id: number;
  title: string;
  company: string;
  status: string;
  rate?: string;
  budget?: string;
  duration: string;
  skills?: string[];
  urgency?: string;
  startDate?: string;
  endDate?: string;
  progress?: number;
  totalDays?: number;
  workedDays?: number;
}

interface Payment {
  id: string;
  mission: string;
  company: string;
  amount: number;
  period: string;
  status: string;
  paidDate: string | null;
  method: string;
}

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  bio: string;
  rate: string;
  location: string;
  experience: string;
  availability: string;
  skills: string[];
  isAvailable: boolean;
}

interface FreelanceState {
  availableMissions: FreelanceMission[];
  activeMissions: FreelanceMission[];
  completedMissions: FreelanceMission[];
  payments: Payment[];
  profile: Profile | null;
  stats: {
    totalEarnings: number;
    pendingPayments: number;
    completedProjects: number;
    averageRating: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: FreelanceState = {
  availableMissions: [],
  activeMissions: [],
  completedMissions: [],
  payments: [],
  profile: null,
  stats: {
    totalEarnings: 0,
    pendingPayments: 0,
    completedProjects: 0,
    averageRating: 0,
  },
  loading: false,
  error: null,
};

const freelanceSlice = createSlice({
  name: "freelance",
  initialState,
  reducers: {
    setAvailableMissions: (state, action) => {
      state.availableMissions = action.payload;
    },
    setActiveMissions: (state, action) => {
      state.activeMissions = action.payload;
    },
    setCompletedMissions: (state, action) => {
      state.completedMissions = action.payload;
    },
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
  },
});

export const {
  setAvailableMissions,
  setActiveMissions,
  setCompletedMissions,
  setPayments,
  setProfile,
  setStats,
  setLoading,
  setError,
  updateProfile,
} = freelanceSlice.actions;

export default freelanceSlice.reducer;

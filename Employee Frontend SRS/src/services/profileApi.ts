import { DEMO_PROFILE } from "../data/mockData";
import type { EmployeeProfile } from "../types";

export const profileApi = {
  async getProfile(): Promise<EmployeeProfile> {
    await new Promise((r) => setTimeout(r, 600));
    return { ...DEMO_PROFILE };
  },

  async updateProfile(updates: Partial<EmployeeProfile>): Promise<EmployeeProfile> {
    await new Promise((r) => setTimeout(r, 800));
    return { ...DEMO_PROFILE, ...updates };
  },

  async completeOnboarding(profile: Partial<EmployeeProfile>): Promise<EmployeeProfile> {
    await new Promise((r) => setTimeout(r, 1200));
    return { ...DEMO_PROFILE, ...profile, onboardingComplete: true };
  },
};

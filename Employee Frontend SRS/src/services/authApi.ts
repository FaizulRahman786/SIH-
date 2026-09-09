import { DEMO_USER } from "../data/mockData";
import type { User } from "../types";

const AUTH_KEY = "skillsaarthi_auth";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  designation: string;
  department: string;
}

export const authApi = {
  async login(credentials: LoginCredentials): Promise<User> {
    await new Promise((r) => setTimeout(r, 800));
    if (credentials.email && credentials.password) {
      const user = { ...DEMO_USER };
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      return user;
    }
    throw new Error("Invalid credentials");
  },

  async register(data: RegisterData): Promise<User> {
    await new Promise((r) => setTimeout(r, 1000));
    const user: User = { id: "emp-new", name: data.name, email: data.email, role: "employee" };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  },

  async logout(): Promise<void> {
    localStorage.removeItem(AUTH_KEY);
  },

  getCurrentUser(): User | null {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(AUTH_KEY);
  },
};

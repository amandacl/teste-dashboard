import { IDashboardLoginForm } from "../components/login-form.component";
import { api } from "./api";

class SessionService {
  public static async getUserById(id: string) {
    try {
      const { data } = await api.get(`users/${id}/`);
      return data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  public static async login(payload: IDashboardLoginForm) {
    try {
      const { data } = await api.post("/token", payload);

      return data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
}

export const sessionService = SessionService;

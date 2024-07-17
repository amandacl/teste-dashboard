import { IUser } from "../interfaces/user.interface";
import { api } from "./api";

class SessionService {
  public static async getUserById(id?: string) {
    try {
      const { data } = await api.get<IUser>(`users/${id}/`);      
      return data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
}
export const sessionService = SessionService;

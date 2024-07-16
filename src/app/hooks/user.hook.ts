import { useCallback, useEffect, useState } from "react";
import { sessionService } from "../services/user.service";

export const useUser = () => {
  const userId = window?.sessionStorage.getItem("userId");
  const [username, setUserame] = useState("");

  const getUserName = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await sessionService.getUserById(userId);
      setUserame(response?.name);
    } catch (err) {
      console.error(err);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) getUserName();
  }, [getUserName, userId]);

  return {
    username,
  };
};

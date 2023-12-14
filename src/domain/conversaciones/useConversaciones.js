import useSWR from "swr";
import {
  createConversacion,
  getConversaciones,
} from "../../api/conversaciones";

export const useConversaciones = () => {
  const { data, error, isLoading, mutate } = useSWR("/profile/realtime", () =>
    getConversaciones()
  );

  async function create(payload) {
    try {
      const conversacion = await createConversacion(payload);

      return conversacion;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return { data, loading: isLoading, error, actions: { create } };
};

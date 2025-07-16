import { instance as http } from "./http";
export const createServices = async (payload) => {
  try {
    const { data: response } = await http.post("/services", payload);

    return response;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getServices = async () => {
  console.log("Fetching services...");
  try {
    const { data: response } = await http.get("/services");

    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getServiceById = async (serviceId) => {
  try {
    const { data: response } = await http.get(`/services/${serviceId}`);

    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const updateService = async (serviceId, payload) => {
  try {
    const { data: response } = await http.put(
      `/services/${serviceId}`,
      payload
    );

    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

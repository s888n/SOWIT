import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL as string;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getPolygons() {
  try {
    const response = await axiosInstance.get("/polygons/");
    if (response.status !== 200) {
      throw new Error(
        `Failed to get polygons: Status ${response.status} - ${response.statusText}`
      );
    }
    return response.data; // Return the data only if successful
  } catch (error: any) {
    console.error("Error fetching polygons:", error);
    throw error;
  }
}

export async function getPolygon(id: string) {
  try {
    const response = await axiosInstance.get(`/polygons/${id}/`);
    if (response.status !== 200) {
      throw new Error(
        `Failed to get polygon: Status ${response.status} - ${response.statusText}`
      );
    }
    return response.data; // Return the data only if successful
  } catch (error: any) {
    console.error("Error fetching polygon:", error);
    throw error;
  }
}

export async function createPolygon(
  name: string,
  description: string,
  area: number,
  coordinates: any,
  thumbnail: string
) {
  try {
    const response = await axiosInstance.post("/polygons/", {
      name,
      description,
      area,
      coordinates,
      thumbnail,
    });
    if (response.status !== 201) {
      throw new Error(
        `Failed to create polygon: Status ${response.status} - ${response.statusText}`
      );
    }
    return response.data;
  } catch (error: any) {
    console.error("Error creating polygon:", error);
    throw error;
  }
}

export async function updatePolygon(id: string, polygon: any) {
  try {
    const response = await axiosInstance.put(`/polygons/${id}/`, polygon);
    if (response.status !== 200) {
      throw new Error(
        `Failed to update polygon: Status ${response.status} - ${response.statusText}`
      );
    }
    return response.data;
  } catch (error: any) {
    console.error("Error updating polygon:", error);
    throw error;
  }
}

export async function deletePolygon(id: string) {
  try {
    const response = await axiosInstance.delete(`/polygons/${id}/`);
    if (response.status !== 204) {
      throw new Error(
        `Failed to delete polygon: Status ${response.status} - ${response.statusText}`
      );
    }
  } catch (error: any) {
    console.error("Error deleting polygon:", error);
    throw error;
  }
}

export async function getUser() {
  try {
    const response = await axiosInstance.get("/user/");
    if (response.status !== 200) {
      throw new Error(
        `Failed to get user: Status ${response.status} - ${response.statusText}`
      );
    }
    return response.data;
  } catch (error: any) {
    console.error("Error fetching user");
    throw error;
  }
}

const DIGIMON_API_URL = "https://digi-api.com/api/v1/digimon";

export const fetchDigimonList = async (page = 1, pageSize = 10) => {
  try {
    const response = await fetch(
      `${DIGIMON_API_URL}?page=${page}&pageSize=${pageSize}`
    );
    const data = await response.json();
    if (data && data.content && Array.isArray(data.content)) {
      return data.content;
    } else {
      console.error("Digimons data is not in the expected format:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching Digimons:", error);
    return [];
  }
};

export const fetchDigimonDetail = async (id) => {
  try {
    const response = await fetch(`${DIGIMON_API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Digimon detail");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching Digimon detail:", error);
    return null;
  }
};

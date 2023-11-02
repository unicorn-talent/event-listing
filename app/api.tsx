import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface responseType {
  code: number;
  message: string;
  data: any;
}

export const getRequestData = async (path: string) => {
  try {
    const response: responseType = await axios.get(`${apiUrl + path}`);
    if (response.data.code === 200) {
      return {
        data: response.data.data,
        error: "",
      };
    } else {
      return {
        data: response.data.data,
        error: response.data.message,
      };
    }
  } catch (error) {
    return {
      data: [],
      error: "An error occurred while fetching events.",
    };
  }
};

export const postRequestData = async (path: string) => {
  try {
    const response = await axios.post(`${apiUrl + path}`);
    if (response.data.code === 200) {
      return {
        data: response.data.data,
        error: "",
      };
    } else {
      return {
        data: response.data.data,
        error: response.data.message,
      };
    }
  } catch (error) {
    return {
      data: [],
      error: "An error occurred while fetching events.",
    };
  }
};

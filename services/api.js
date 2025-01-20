import axios from 'axios';

// Create axios instance with custom config
const axiosInstance = axios.create({
  baseURL: 'https://f10b-122-176-44-176.ngrok-free.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token or other headers
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add authorization token here
    // const token = await getToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          break;
        case 404:
          // Handle not found
          break;
        case 500:
          // Handle server error
          break;
        default:
          // Handle other errors
          break;
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error:', error.request);
    } else {
      // Error in request configuration
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// API methods
export const api = {
  getStocks: async (page = 1, pageSize = 98) => {
    try {
      const response = await axiosInstance.get(`/stocks`, {
        params: {
          page,
          pageSize,
        },
      });
      return response;
    } catch (error) {
      console.error('Error fetching stocks:', error);
      throw error;
    }
  },
  
  searchStocks: async (query, page = 1, pageSize = 98) => {
    try {
      const response = await axiosInstance.get(`/stocks/search`, {
        params: {
          query,
          page,
          pageSize,
        },
      });
      return response;
    } catch (error) {
      console.error('Error searching stocks:', error);
      throw error;
    }
  },
};

export default axiosInstance;
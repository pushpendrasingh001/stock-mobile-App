import axios from 'axios';

// Define the base URL for the API
const BASE_URL = 'https://94f3-122-176-44-176.ngrok-free.app/';

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Set a timeout of 10 seconds
});

// Add a request interceptor
// api.interceptors.request.use(
//   async (config) => {
//     // Example: Attach an Authorization token if needed
//     const token = 'YOUR_TOKEN'; // Replace with token retrieval logic (e.g., AsyncStorage)
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     // Handle request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// api.interceptors.response.use(
//   (response) => {
//     // Handle successful response
//     return response;
//   },
//   (error) => {
//     // Handle response errors
//     console.error('API Error:', error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

export default api;

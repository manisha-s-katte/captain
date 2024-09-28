import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URI,
  headers: {
    Accept: 'application/json',
  },
});

// Function to set headers for form data
export const setFormDataHeaders = () => {
  api.defaults.headers['Content-Type'] = 'multipart/form-data';
};

// Function to set headers to application/json
export const setJSONDataHeaders = () => {
  api.defaults.headers['Content-Type'] = 'application/json';
};

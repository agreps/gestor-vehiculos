import axios from 'axios';

const API_URL = 'https://api.api-ninjas.com/v1/cars';
const API_KEY = '4Tct9VcKnGVf6JxgdiXbbAgbeGFvp89R4tAIxBxU';

export const fetchCars = async (model = '', limit = 20) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'X-Api-Key': API_KEY
      },
      params: {
        model,
        limit
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
};





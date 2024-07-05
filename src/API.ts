import axios from 'axios';

const API_ENDPOINT =
  import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000';

export const getResponse = async <T>(
  path: string,
  params?: { [key: string]: string } | undefined
): Promise<T | Error> => {
  try {
    const result = await axios.get(
      `${API_ENDPOINT}/${path}`,
      params ? { params } : undefined
    );
    console.log(result.data);
    return result.data;
    
  } catch {
    return new Error('Failed to fetch data');
  }
};

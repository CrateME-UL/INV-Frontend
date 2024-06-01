import axios from 'axios';
import { ItemModel } from './types/ModelType';
import { ItemDtoToModel } from './mapper/DtoToModelMapper/ItemDtoMapper';

const API_ENDPOINT =
  import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000';

export const getItems = async (): Promise<ItemModel[] | Error> => {
  try {
    const result = await axios.get(`${API_ENDPOINT}/items`);
    console.log(result.data);
    return result.data.map(ItemDtoToModel);
  } catch {
    return new Error('Failed to fetch items');
  }
};

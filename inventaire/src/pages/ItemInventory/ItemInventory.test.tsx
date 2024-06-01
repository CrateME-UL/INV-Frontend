import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, vi, expect, Mock } from 'vitest';
import ItemInventory from './ItemInventory';
import { getItems } from '../../API';
import { ItemModel } from '../../types/ModelType';
import { v4 as uuid } from 'uuid';

vi.mock('../../API', () => ({
  getItems: vi.fn(),
}));

describe('ItemInventory', () => {
  it('renders without crashing', () => {
    render(<ItemInventory />);
    expect(screen.getByText('Inventaire')).toBeInTheDocument();
  });

  it('fetches and displays items', async () => {
    const mockItems: ItemModel[] = [
      {
        itemId: uuid(),
        nbOfItems: 10,
        itemName: 'Item 1',
        placeId: 1,
      },
      {
        itemId: uuid(),
        nbOfItems: 5,
        itemName: 'Item 2',
        placeId: 1,
      },
    ];
    (getItems as Mock).mockResolvedValue(mockItems);

    render(<ItemInventory />);

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });

  it('displays error message on fetch failure', async () => {
    (getItems as Mock).mockRejectedValue(new Error('Fetch error'));

    render(<ItemInventory />);

    await waitFor(() => {
      expect(
        screen.getByText('Something went wrong...')
      ).toBeInTheDocument();
    });
  });
});

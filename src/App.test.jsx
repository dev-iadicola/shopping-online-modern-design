import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App.jsx';

vi.mock('./components/useFetch', () => ({
  default: () => ({
    data: [
      {
        id: 1,
        title: 'Nova Glass Lamp',
        price: 129.99,
        description: 'A sculptural lamp for modern interiors.',
        category: 'home',
        image: 'https://example.com/lamp.png',
        rating: {
          rate: 4.8,
          count: 128,
        },
      },
    ],
    isLoading: false,
    error: '',
  }),
}));

test('renders the redesigned storefront hero', () => {
  render(<App />);
  expect(screen.getByText(/real catalog snapshot/i)).toBeInTheDocument();
  expect(screen.getAllByText(/nova glass lamp/i).length).toBeGreaterThan(0);
  expect(screen.getByRole('button', { name: /browse catalog/i })).toBeInTheDocument();
});

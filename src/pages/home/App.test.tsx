import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import App from './App';
import { FilterStateProvider } from '../../state';

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => [
      {
        id: '1',
        name: 'Apollo 11',
        date_utc: '1969-07-16T13:32:00.000Z',
        success: true,
        links: {
          patch: {
            small: 'apollo11.png',
          },
        },
      },
      {
        id: '2',
        name: 'Apollo 12',
        date_utc: '1969-07-16T13:32:00.000Z',
        success: true,
        links: {
          patch: {
            small: 'apollo12.png',
          },
        },
      },
      {
        id: '3',
        name: 'SpaceX 1',
        date_utc: '2020-07-16T13:32:00.000Z',
        success: false,
        links: {
          patch: {
            small: 'spaceX1.png',
          },
        },
      },
    ],
  } as Response);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('App Component Smoke Test', () => {
  it('renders without crashing and displays launch data', async () => {
    render(
      <FilterStateProvider>
        <App />
      </FilterStateProvider>
    );

    expect(screen.getByTestId(/progress/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Apollo 11')).toBeInTheDocument();
      expect(screen.getByAltText('Apollo 12')).toBeInTheDocument();
    });
  });

  it('renders error message when fetch fails', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Internal Server Error' }),
    } as Response);

    render(
      <FilterStateProvider>
        <App />
      </FilterStateProvider>
    );

    expect(screen.getByTestId(/progress/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByTestId(/error/i)).toBeInTheDocument();
      expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    });
  });

  it('renders filtered launch data', async () => {
    render(
      <FilterStateProvider>
        <App />
      </FilterStateProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Apollo 11')).toBeInTheDocument();
      expect(screen.getByAltText('Apollo 12')).toBeInTheDocument();
      expect(screen.getByAltText('SpaceX 1')).toBeInTheDocument();
    });

    const selectToggleBtn = screen.getByTestId(/toggle-select-btn/i);

    fireEvent.click(selectToggleBtn, { stopPropagation: () => true });
    const dropdownMenu = screen.queryByTestId(/dropdown-menu/i);
    await waitFor(() => {
      expect(dropdownMenu).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId(/dropdown-option-2020/i));

    await waitFor(async () => {
      expect(screen.queryByAltText('SpaceX 1')).toBeInTheDocument();
      expect(screen.queryByAltText('Apollo 12')).not.toBeInTheDocument();
      expect(screen.queryByAltText('Apollo 11')).not.toBeInTheDocument();
    });

    fireEvent.click(selectToggleBtn, { stopPropagation: () => true });
    fireEvent.click(screen.getByTestId(/dropdown-option-1969/i));

    await waitFor(async () => {
      expect(screen.queryByAltText('SpaceX 1')).not.toBeInTheDocument();
      expect(screen.queryByAltText('Apollo 12')).toBeInTheDocument();
      expect(screen.queryByAltText('Apollo 11')).toBeInTheDocument();
    });
  });
});

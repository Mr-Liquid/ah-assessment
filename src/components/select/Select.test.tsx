import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';
import { describe, it, expect } from 'vitest';
import { act } from 'react';

describe('Select Component', () => {
  it('matches snapshot with props', () => {
    const { container } = render(
      <Select options={[{ label: 'Option 1', value: '1' }]} value="1" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('toggles dropdown on button click', () => {
    render(
      <Select
        options={[
          { label: '2021', value: '2021' },
          { label: '2022', value: '2022' },
        ]}
      />
    );

    expect(screen.queryByTestId(/dropdown-menu/i)).not.toBeInTheDocument();
    const toggleButton = screen.getByTestId(/toggle-select-btn/i);
    fireEvent.click(toggleButton);

    act(() => {
      expect(screen.getByTestId(/dropdown-menu/i)).toBeInTheDocument();
    });

    fireEvent.click(toggleButton);

    act(() => {
      expect(screen.queryByTestId(/dropdown-menu/i)).not.toBeInTheDocument();
    });
  });

  it('closes dropdown on outside click', () => {
    render(
      <div>
        <Select
          options={[
            { label: '2021', value: '2021' },
            { label: '2022', value: '2022' },
          ]}
        />
        <button data-testid="outside-button">Outside</button>
      </div>
    );

    const toggleButton = screen.getByTestId(/toggle-select-btn/i);
    const outsideButton = screen.getByTestId(/outside-button/i);

    fireEvent.click(toggleButton);
    act(() => {
      expect(screen.getByTestId(/dropdown-menu/i)).toBeInTheDocument();
    });

    fireEvent.click(outsideButton);
    act(() => {
      expect(screen.queryByTestId(/dropdown-menu/i)).not.toBeInTheDocument();
    });
  });
});

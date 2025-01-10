import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Input } from './Input';

describe('Input Component', () => {
  it('matches snapshot with default props', () => {
    const { container } = render(<Input />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot with value', () => {
    const { container } = render(<Input value="test value" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

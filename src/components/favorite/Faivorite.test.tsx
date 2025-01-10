import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Favorite } from './Favorite';

describe('Favorite Component', () => {
  it('matches snapshot favorite is set', () => {
    const { container } = render(
      <Favorite favorite={true} id="testId" onFavorite={() => {}} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot favorite is unset', () => {
    const { container } = render(
      <Favorite favorite={false} id="testId" onFavorite={() => {}} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

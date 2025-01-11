import { render } from '@testing-library/react';
import { Select } from './Select';

test('Select matches snapshot', () => {
  const { asFragment } = render(
    <Select options={[{ label: 'Option 1', value: '1' }]} value="1" />
  );
  expect(asFragment()).toMatchSnapshot();
});

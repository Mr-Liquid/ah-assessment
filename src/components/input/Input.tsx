import { forwardRef } from 'react';
import { MagnifierIcon } from '../icons';

type InputProps = {
  value?: string;
  onChange?: (value: string) => void;
};

function Input(
  { value = '', onChange = () => null }: InputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      className="shadow-sm flex px-4 py-2 rounded-md border-2 border-gray-200 overflow-hidden max-w-md w-full font-[sans-serif] justify-self-start"
      ref={ref}
    >
      <MagnifierIcon className="fill-gray-600 mr-3 rotate-90" />
      <input
        data-testid="search"
        type="text"
        placeholder="Search Something..."
        onChange={e => onChange(e.target.value)}
        className="w-full outline-none bg-transparent text-gray-600 text-sm"
        value={value}
      />
    </div>
  );
}

const ForwardedRefInput = forwardRef(Input);

export { ForwardedRefInput as Input };

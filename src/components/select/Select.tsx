import { forwardRef, useState, useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside/useClickOutside';

type SelectProps = {
  children?: React.ReactNode;
  value?: string;
  options?: { label: string; value: string }[];
  onChange?: (value: string) => void;
};

function Select(
  { children, value = '', options, onChange = () => null }: SelectProps,
  ref: React.ForwardedRef<HTMLDivElement | null>
) {
  const [isOpen, setIsOpen] = useState(false);
  const label = options?.find(option => option.value === value)?.label ?? '';
  const [selectedOption, setSelectedOption] = useState<string | ''>(label);
  const innerRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: string) => {
    const label = options?.find(option => option.value === value)?.label ?? '';
    setSelectedOption(label);
    setIsOpen(false);
  };

  useClickOutside(innerRef, () => setIsOpen(false));

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleDropdown();
  };

  return (
    <div className="flex items-center">
      <div className="relative inline-block text-left" ref={innerRef}>
        <div>
          <button
            data-testid="toggle-select-btn"
            id="dropdown-button"
            type="button"
            onClick={handleButtonClick}
            className="inline-flex justify-center items-center w-60 rounded-md border-2 border-gray-200 shadow-sm px-4 py-2 bg-white-700 text-sm text-gray-600 hover:bg-white-600 focus:outline-none"
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            <span
              id="dropdown-selected-option"
              className="w-full text-left overflow-hidden flex-1"
            >
              {selectedOption === '' ? 'Select Year' : selectedOption}
            </span>
            <svg
              id="caret"
              className="ml-2.5 -mr-1.5 h-5 w-5"
              style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div
            id="dropdown-menu"
            data-testid="dropdown-menu"
            className="overflow-scroll h-[200px] bg-white origin-top-right absolute w-full left-0 mt-2 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-button"
            tabIndex={-1}
            ref={ref}
          >
            <div className="py-1 text-black" role="none">
              {options
                ? options.map(({ value, label }, i) => (
                    <a
                      role="menuitem"
                      data-testid={`dropdown-option-${label}`}
                      key={`${value}-${i}`}
                      className="block px-4 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-500 cursor-pointer"
                      onClick={() => {
                        onChange(value);
                        handleOptionClick(value);
                      }}
                    >
                      {label}
                    </a>
                  ))
                : children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const ForwardedRefSelect = forwardRef(Select);
export { ForwardedRefSelect as Select };

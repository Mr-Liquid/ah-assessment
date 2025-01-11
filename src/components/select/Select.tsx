import { useState, useRef } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside/useClickOutside';
import { SelectOption } from './SelectOption';
import { ArrowIcon } from '../icons';

type SelectProps = {
  value?: string;
  options?: { label: string; value: string }[];
  onChange?: (value: string) => void;
};

const Select = ({
  value = '',
  options,
  onChange = () => null,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const label = options?.find(option => option.value === value)?.label ?? '';
  const [selectedOption, setSelectedOption] = useState<string | ''>(label);
  const innerRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: string) => {
    const label = options?.find(option => option.value === value)?.label ?? '';
    onChange(value);
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
            <ArrowIcon
              className="ml-2.5 -mr-1.5 h-5 w-5"
              style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>
        </div>
        {isOpen && (
          <div
            id="dropdown-menu"
            data-testid="dropdown-menu"
            className="overflow-scroll h-[200px] bg-white origin-top-right absolute w-full left-0 mt-2 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="listbox"
            aria-orientation="vertical"
            aria-labelledby="dropdown-button"
            tabIndex={-1}
          >
            {options?.map((option, index) => {
              return (
                <SelectOption
                  key={`option.label-${index}`}
                  option={option}
                  handleOptionClick={handleOptionClick}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export { Select };

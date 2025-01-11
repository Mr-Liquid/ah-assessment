type SelectOptionProps = {
  option?: { label: string; value: string };
  handleOptionClick: (value: string) => void;
  children?: React.ReactNode;
};

const SelectOption = ({
  option,
  children,
  handleOptionClick,
}: SelectOptionProps) => {
  return (
    <div className="py-1 text-black" role="none">
      {option ? (
        <a
          role="menuitem"
          data-testid={`dropdown-option-${option.label}`}
          className="block px-4 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-500 cursor-pointer"
          onClick={() => {
            handleOptionClick(option.value);
          }}
        >
          {option.label}
        </a>
      ) : (
        children
      )}
    </div>
  );
};

export { SelectOption };

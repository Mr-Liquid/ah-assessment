import { Input } from '../input/Input';
import { Select } from '../select/Select';
import { useFilterController } from './useFilterController';

type FilterProps = {
  years: {
    label: string;
    value: string;
  }[];
};

const Filter = ({ years }: FilterProps) => {
  const { searchTerm, selectedYear, onSearchHandler, onYearChangeHandler } =
    useFilterController();
  return (
    <div aria-label="Main Navigation" className="flex">
      <div className="w-[350px] mr-2">
        <Input value={searchTerm} onChange={onSearchHandler} />
      </div>

      <Select
        value={selectedYear}
        options={years}
        onChange={onYearChangeHandler}
      />
    </div>
  );
};

export { Filter };

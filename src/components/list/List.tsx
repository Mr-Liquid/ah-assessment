import { forwardRef } from 'react';

type ListProps<T extends { id?: string }> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};
function List<T extends { id?: string }>(
  { items, renderItem }: ListProps<T>,
  ref: React.ForwardedRef<HTMLLIElement>
) {
  return (
    <ul
      className="divide-y divide-gray-200 overflow-scroll h-[90dvh] flex flex-col flex-1"
      aria-labelledby="list-heading"
    >
      {items.map((item, index) => (
        <li key={item.id ?? index} className="py-1 flex" ref={ref}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

const ForwardedRefList = forwardRef(List);

export { ForwardedRefList as List };

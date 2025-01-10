import { memo } from 'react';

type FavoriteProps = {
  onFavorite: (data: { id: string; actionType: 'remove' | 'add' }) => void;
  favorite: boolean;
  id: string;
};

export const Favorite = memo(
  ({ onFavorite, id, favorite }: FavoriteProps) => {
    return (
      <svg
        onClick={() =>
          onFavorite({
            id,
            actionType: favorite ? 'remove' : 'add',
          })
        }
        className={`cursor-pointer ${favorite ? 'fill-gray-400' : ''}`}
        width="21"
        height="21"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#8899a4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    );
  },
  (prev, next) => prev.favorite === next.favorite
);

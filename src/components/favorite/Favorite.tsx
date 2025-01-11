import { FavoriteIcon } from '../icons';

type FavoriteProps = {
  id: string;
  favorite: boolean;
  onFavorite: (data: { id: string; actionType: 'add' | 'remove' }) => void;
};

const Favorite = ({ id, favorite, onFavorite }: FavoriteProps) => {
  const handleFavoriteClick = () => {
    onFavorite({
      id,
      actionType: favorite ? 'remove' : 'add',
    });
  };

  return (
    <button
      onClick={handleFavoriteClick}
      aria-pressed={favorite}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <FavoriteIcon favorite={favorite} />
    </button>
  );
};

export { Favorite };

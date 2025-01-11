import { FavoriteIcon } from '../icons';

type FavoriteProps = {
  id: string;
  favorite: boolean;
  onFavorite: (data: { id: string; actionType: 'add' | 'remove' }) => void;
};

export const Favorite = ({ id, favorite, onFavorite }: FavoriteProps) => {
  const handleFavoriteClick = () => {
    onFavorite({
      id,
      actionType: favorite ? 'remove' : 'add',
    });
  };

  return (
    <button onClick={handleFavoriteClick} aria-pressed={favorite}>
      <FavoriteIcon favorite={favorite} />
    </button>
  );
};

export default Favorite;

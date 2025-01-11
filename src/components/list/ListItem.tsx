import fallbackImage from '@assets/fallback.png';
import { Favorite } from '../favorite/Favorite';

type ListProps = {
  missionName: string;
  launchYear: string;
  status: string;
  image: string;
  isInFavorites: boolean;
  id: string;
  handleFavorite: (data: { id: string; actionType: 'add' | 'remove' }) => void;
};

const ListItem = ({
  missionName,
  launchYear,
  status,
  image,
  isInFavorites,
  id,
  handleFavorite,
}: ListProps) => {
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.onerror = null; // Prevents infinite loop if fallback also fails
    e.currentTarget.src = fallbackImage;
  };
  return (
    <figure className="flex items-center">
      <img
        className="size-10 rounded-full"
        src={image}
        alt={missionName}
        onError={handleImageError}
      />
      <figcaption className="ml-3">
        <p className="text-sm font-medium text-gray-900">{missionName}</p>

        <span className="flex justify-between w-[100px]">
          <p
            className={`text-sm mt-1text-gray-800 rounded-lg w-max px-1 ${
              status === 'success' ? 'bg-green-300' : 'bg-red-300'
            }`}
          >
            {status}
          </p>
          <Favorite
            onFavorite={handleFavorite}
            id={id}
            favorite={isInFavorites}
          />
        </span>
        <p className="text-xs italic mt-2">{launchYear}</p>
      </figcaption>
    </figure>
  );
};

export { ListItem };

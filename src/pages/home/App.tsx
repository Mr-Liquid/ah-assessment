import { List, Favorite, Filter, Progress, Error } from '../../components';
import { useAppController } from './useAppController.hook';

function App() {
  const { years, launches, favorites, handleFavorite, isLoading, error } =
    useAppController();

  return (
    <div className="h-screen overflow-hidden container mx-auto flex flex-col">
      <div className="flex pt-4">
        <Filter years={years} />
      </div>
      <div className="flex pt-4">
        {isLoading && <Progress />}
        {!isLoading && !error && (
          <List
            items={launches}
            renderItem={launch => {
              const isInFavorites = favorites?.includes(launch.id) ?? false;
              return (
                <>
                  <img
                    className="size-10 rounded-full"
                    src={launch.image}
                    alt={launch.missionName}
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {launch.missionName}
                    </p>

                    <span className="flex justify-between w-[100px]">
                      <p
                        className={`text-sm mt-1text-gray-800 rounded-lg w-max px-1 ${
                          launch.status === 'success'
                            ? 'bg-green-300'
                            : 'bg-red-300'
                        }`}
                      >
                        {launch.status}
                      </p>
                      <Favorite
                        onFavorite={handleFavorite}
                        id={launch.id}
                        favorite={isInFavorites}
                      />
                    </span>
                    <p className="text-xs italic mt-2">{launch.launchYear}</p>
                  </div>
                </>
              );
            }}
          />
        )}
        {!isLoading && !!error && <Error />}
      </div>
    </div>
  );
}

export default App;

import { List, Filter, Progress, Error, ListItem } from '../../components';
import { useAppController } from './useAppController.hook';

function App() {
  const { years, launches, favorites, handleFavorite, isLoading, error } =
    useAppController();

  return (
    <main className="h-screen overflow-hidden container mx-auto flex flex-col">
      <header className="flex pt-4">
        <Filter years={years} />
      </header>
      <section className="flex pt-4">
        {isLoading && <Progress />}
        {!isLoading && !error && (
          <List
            items={launches}
            renderItem={launch => {
              const isInFavorites = favorites?.includes(launch.id) ?? false;
              return (
                <ListItem {...{ ...launch, isInFavorites, handleFavorite }} />
              );
            }}
          />
        )}
        {!isLoading && !!error && <Error />}
      </section>
    </main>
  );
}

export default App;

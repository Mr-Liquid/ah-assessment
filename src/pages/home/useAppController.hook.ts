import { useMemo } from 'react';
import { useApi } from '../../hooks';
import { Launch } from '../../types/launch.types';
import { getYear } from 'date-fns';
import { useFilterState } from '../../state';
import { useFavorites } from '../../hooks/useFavorites';

export const useAppController = () => {
  const response = useApi<Launch[]>('launches');
  const state = useFilterState();
  const setFavorite = useFavorites();

  const launches = useMemo(() => {
    return (
      response.data?.map(launch => ({
        missionName: launch.name,
        launchYear: getYear(new Date(launch.date_utc)).toString() ?? '',
        status: launch.success
          ? 'success'
          : ('failure' as 'success' | 'failure'),
        image: launch.links.patch?.small ?? '',
        id: launch.id,
      })) ?? []
    );
  }, [response.data]);

  const filteredLaunches = useMemo(() => {
    return launches.filter(launch => {
      const escapedTerm =
        state?.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') ?? '';
      const regex = new RegExp(escapedTerm, 'i');

      const matchesSearch =
        !state?.searchTerm || regex.test(launch.missionName);
      const matchesYear =
        state?.selectedYear === '' ||
        parseInt(launch.launchYear, 10) ===
          parseInt(state?.selectedYear ?? '', 10);
      return matchesSearch && matchesYear;
    });
  }, [launches, state?.searchTerm, state?.selectedYear]);

  const years =
    response?.data
      ?.map(launch =>
        launch.date_utc ? getYear(new Date(launch.date_utc)).toString() : null
      )
      .filter(Boolean) ?? [];

  const yearsSet = new Set(years);
  const yearsArray = [
    {
      label: 'All Years',
      value: '',
    },
    ...Array.from(yearsSet)
      .map(year => ({
        label: `${year}`,
        value: `${year}`,
      }))
      .sort((a, b) => parseInt(b.value, 10) - parseInt(a.value, 10)),
  ];

  return {
    ...state,
    isLoading: response.loading,
    error: response.error,
    years: yearsArray,
    launches: filteredLaunches,
    handleFavorite: setFavorite,
  };
};

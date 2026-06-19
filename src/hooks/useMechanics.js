import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

export function useMechanics({ enabled, coords, filters }) {
  const [state, setState] = useState({
    status: enabled ? 'loading' : 'idle',
    data: [],
    error: null,
  });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();

    async function loadMechanics() {
      setState((prev) => ({ ...prev, status: 'loading', error: null }));

      try {
        const params = new URLSearchParams({
          distanceKm: String(filters.distanceKm),
          maxBudget: String(filters.budget),
        });

        if (coords) {
          params.set('lat', String(coords.lat));
          params.set('lng', String(coords.lng));
        }

        const payload = await apiFetch(`/mechanics?${params.toString()}`, {
          signal: controller.signal,
        });

        setState({
          status: 'success',
          data: payload.data || [],
          error: null,
        });
      } catch (error) {
        if (error.name === 'AbortError') return;

        setState({
          status: 'error',
          data: [],
          error: error.message,
        });
      }
    }

    loadMechanics();

    return () => controller.abort();
  }, [
    coords?.lat,
    coords?.lng,
    enabled,
    filters.budget,
    filters.distanceKm,
    refreshKey,
  ]);

  return {
    ...state,
    refresh: () => setRefreshKey((value) => value + 1),
  };
}

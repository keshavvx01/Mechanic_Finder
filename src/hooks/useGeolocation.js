import { useEffect, useState } from 'react';

const fallbackCoords = { lat: 28.6139, lng: 77.209 };

export function useGeolocation(enabled) {
  const [state, setState] = useState({
    status: enabled ? 'loading' : 'idle',
    coords: null,
    error: null,
  });

  useEffect(() => {
    if (!enabled) return;
    if (!navigator.geolocation) {
      setState({ status: 'error', coords: fallbackCoords, error: 'unsupported' });
      return;
    }

    setState((prev) => ({ ...prev, status: 'loading' }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          status: 'success',
          coords: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          error: null,
        });
      },
      (error) => {
        setState({ status: 'error', coords: fallbackCoords, error: error.message });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      },
    );
  }, [enabled]);

  return state;
}

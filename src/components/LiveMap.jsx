import { motion } from 'framer-motion';
import L from 'leaflet';
import { useEffect, useMemo } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { useAnimatedMechanics } from '../hooks/useAnimatedMechanics';

const defaultCenter = [28.6139, 77.209];

export function LiveMap({
  locationState,
  mechanics,
  selectedMechanicId,
  onSelectMechanic,
  feedStatus,
  feedError,
}) {
  const renderedMechanics = useAnimatedMechanics(mechanics);

  const userIcon = useMemo(
    () =>
      L.divIcon({
        className: 'user-location-icon',
        html: `
          <div class="user-marker">
            <span class="user-marker__ring"></span>
            <span class="user-marker__ring user-marker__ring--delay"></span>
            <span class="user-marker__dot"></span>
          </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
      }),
    [],
  );

  return (
    <div className="relative min-h-screen w-full">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="h-screen w-full"
      >
        <MapContainer
          center={defaultCenter}
          zoom={13}
          zoomControl={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors &copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          <MapFlight coords={locationState.coords} />

          {locationState.coords ? (
            <Marker
              position={[locationState.coords.lat, locationState.coords.lng]}
              icon={userIcon}
            />
          ) : null}

          {renderedMechanics.map((mechanic, index) => (
            <MechanicMarker
              key={mechanic.id}
              mechanic={mechanic}
              index={index}
              isSelected={selectedMechanicId === mechanic.id}
              onSelect={() => onSelectMechanic(mechanic.id)}
            />
          ))}
        </MapContainer>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-28 z-[500] flex justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-sm rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs text-white/75 backdrop-blur-md"
        >
          {feedError
            ? 'API unreachable. Start the backend server to load live mechanics.'
            : feedStatus === 'loading'
              ? 'Refreshing nearby verified mechanics...'
              : locationState.status === 'loading'
                ? 'Locking onto your location...'
                : locationState.status === 'error'
                  ? 'Location access denied. Showing a default service zone.'
                  : `${mechanics.length} nearby verified mechanics updated in real time.`}
        </motion.div>
      </div>

      {feedStatus === 'success' && mechanics.length === 0 ? (
        <div className="pointer-events-none absolute inset-x-0 top-36 z-[500] px-4">
          <div className="mx-auto max-w-sm rounded-[28px] border border-white/10 bg-black/35 p-4 text-sm text-white/75 backdrop-blur-md">
            No mechanics match the current distance and budget filters. Expand the range to reveal more listings.
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MapFlight({ coords }) {
  const map = useMap();

  useEffect(() => {
    if (!coords) return;
    map.flyTo([coords.lat, coords.lng], 14, {
      animate: true,
      duration: 1.6,
    });
  }, [coords, map]);

  return null;
}

function MechanicMarker({ mechanic, index, isSelected, onSelect }) {
  const icon = useMemo(() => {
    const selectedClass = isSelected ? 'mechanic-pin--selected' : '';
    const exitingClass = mechanic.isExiting ? 'mechanic-pin--exit' : '';
    return L.divIcon({
      className: 'mechanic-pin-wrapper',
      html: `
        <button
          class="mechanic-pin ${selectedClass} ${exitingClass}"
          type="button"
          aria-label="${mechanic.name}"
          style="animation-delay:${index * 80}ms"
        >
          <span class="mechanic-pin__halo"></span>
          <span class="mechanic-pin__core">
            <span class="mechanic-pin__price">Rs ${mechanic.basePrice}</span>
          </span>
        </button>
      `,
      iconSize: [96, 56],
      iconAnchor: [48, 48],
    });
  }, [index, isSelected, mechanic.basePrice, mechanic.isExiting, mechanic.name]);

  return (
    <Marker
      position={[mechanic.coords.lat, mechanic.coords.lng]}
      icon={icon}
      eventHandlers={{ click: onSelect }}
    />
  );
}

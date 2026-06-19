import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FilterBar } from './components/FilterBar';
import { LiveMap } from './components/LiveMap';
import { MechanicRegistrationPanel } from './components/MechanicRegistrationPanel';
import { MechanicSheet } from './components/MechanicSheet';
import { OnboardingOverlay } from './components/OnboardingOverlay';
import { RequestStatusCard } from './components/RequestStatusCard';
import { RoleDock } from './components/RoleDock';
import { ServiceRequestSheet } from './components/ServiceRequestSheet';
import { useGeolocation } from './hooks/useGeolocation';
import { useMechanics } from './hooks/useMechanics';

const DEFAULT_FILTERS = {
  distanceKm: 6,
  budget: 3500,
};

export default function App() {
  const [mode, setMode] = useState('driver');
  const [hasEntered, setHasEntered] = useState(false);
  const [selectedMechanicId, setSelectedMechanicId] = useState(null);
  const [requestMechanic, setRequestMechanic] = useState(null);
  const [activeRequest, setActiveRequest] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const locationState = useGeolocation(hasEntered);
  const mechanicsState = useMechanics({
    enabled: hasEntered && mode === 'driver',
    coords: locationState.coords,
    filters,
  });

  const visibleMechanics = mechanicsState.data;

  const selectedMechanic =
    visibleMechanics.find((mechanic) => mechanic.id === selectedMechanicId) ??
    null;

  useEffect(() => {
    if (!visibleMechanics.some((mechanic) => mechanic.id === selectedMechanicId)) {
      setSelectedMechanicId(null);
    }
  }, [selectedMechanicId, visibleMechanics]);

  useEffect(() => {
    if (mode !== 'driver') {
      setSelectedMechanicId(null);
      setRequestMechanic(null);
    }
  }, [mode]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-app text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,139,43,0.18),transparent_30%),radial-gradient(circle_at_bottom,rgba(34,197,94,0.08),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid bg-[size:42px_42px] opacity-30" />

      <motion.main
        animate={{ opacity: hasEntered ? 1 : 0.35 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-screen"
      >
        {mode === 'driver' ? (
          <>
            <FilterBar
              filters={filters}
              onChange={setFilters}
              resultCount={visibleMechanics.length}
            />
            <LiveMap
              locationState={locationState}
              mechanics={visibleMechanics}
              selectedMechanicId={selectedMechanicId}
              onSelectMechanic={setSelectedMechanicId}
              feedStatus={mechanicsState.status}
              feedError={mechanicsState.error}
            />
          </>
        ) : (
          <MechanicRegistrationPanel
            locationState={locationState}
            onRegistered={() => mechanicsState.refresh()}
          />
        )}

      </motion.main>

      <RoleDock mode={mode} onChange={setMode} />

      <AnimatePresence>
        {activeRequest ? (
          <RequestStatusCard
            request={activeRequest}
            onDismiss={() => setActiveRequest(null)}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {selectedMechanic ? (
          <MechanicSheet
            key={selectedMechanic.id}
            mechanic={selectedMechanic}
            userCoords={locationState.coords}
            onRequestAssistance={() => setRequestMechanic(selectedMechanic)}
            onClose={() => setSelectedMechanicId(null)}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {requestMechanic ? (
          <ServiceRequestSheet
            mechanic={requestMechanic}
            locationState={locationState}
            onClose={() => setRequestMechanic(null)}
            onCreated={(request) => {
              setActiveRequest(request);
              setRequestMechanic(null);
              setSelectedMechanicId(null);
            }}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {!hasEntered ? (
          <OnboardingOverlay
            onEnter={() => setHasEntered(true)}
            locationState={locationState}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

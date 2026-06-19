import { motion } from 'framer-motion';
import { LoaderCircle, MapPin, Send, Siren } from 'lucide-react';
import { useMemo, useState } from 'react';
import { apiFetch } from '../lib/api';

const ISSUE_OPTIONS = [
  'Battery dead',
  'Flat tire',
  'Engine overheating',
  'Fuel delivery',
  'General breakdown',
];

export function ServiceRequestSheet({
  mechanic,
  locationState,
  onClose,
  onCreated,
}) {
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    issue: ISSUE_OPTIONS[0],
    notes: '',
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const locationLabel = useMemo(() => {
    if (!locationState.coords) return 'Default service zone';
    return `${locationState.coords.lat.toFixed(4)}, ${locationState.coords.lng.toFixed(4)}`;
  }, [locationState.coords]);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('submitting');
    setError(null);

    try {
      const payload = await apiFetch('/assistance-requests', {
        method: 'POST',
        body: {
          mechanicId: mechanic.id,
          customerName: form.customerName,
          phone: form.phone,
          issue: form.issue,
          notes: form.notes,
          userLocation: locationState.coords ?? mechanic.coords,
        },
      });

      setStatus('success');
      onCreated(payload.data);
    } catch (submitError) {
      setStatus('error');
      setError(submitError.message);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      className="pointer-events-none fixed inset-0 z-[1020] flex items-end justify-center"
    >
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="pointer-events-auto absolute inset-0 bg-black/45"
      />
      <motion.section
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 240, damping: 26 }}
        className="pointer-events-auto relative w-full max-w-md rounded-t-[32px] border border-white/10 bg-panel/95 px-5 pb-7 pt-4 shadow-panel backdrop-blur-xl max-h-[85vh] overflow-y-auto"
      >
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/15" />
        <div className="mb-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-primaryGlow">
            <Siren size={14} />
            Request Rescue
          </p>
          <h3 className="mt-3 text-2xl font-semibold">{mechanic.name}</h3>
          <p className="mt-1 text-sm text-textDim">
            Dispatching to {locationLabel}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Your name"
              value={form.customerName}
              onChange={(customerName) => setForm((prev) => ({ ...prev, customerName }))}
              placeholder="Aarav"
            />
            <Field
              label="Phone"
              value={form.phone}
              onChange={(phone) => setForm((prev) => ({ ...prev, phone }))}
              placeholder="+91 98765 00000"
            />
          </div>

          <label className="block">
            <span className="mb-2 block text-sm text-white">Breakdown type</span>
            <select
              value={form.issue}
              onChange={(event) => setForm((prev) => ({ ...prev, issue: event.target.value }))}
              className="app-input"
            >
              {ISSUE_OPTIONS.map((issue) => (
                <option key={issue} value={issue}>
                  {issue}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-white">Extra notes</span>
            <textarea
              rows="4"
              value={form.notes}
              onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
              className="app-input min-h-28 resize-none"
              placeholder="Car model, exact issue, landmark, or anything helpful for a faster dispatch."
            />
          </label>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-white/75">
            <p className="inline-flex items-center gap-2">
              <MapPin size={14} className="text-primaryGlow" />
              Live location shared with the mechanic for distance and arrival estimates.
            </p>
          </div>

          {error ? <p className="text-sm text-rose-300">{error}</p> : null}

          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            disabled={status === 'submitting'}
            className="flex w-full items-center justify-center gap-2 rounded-[26px] bg-primary px-4 py-4 text-sm font-semibold text-black shadow-glow disabled:opacity-70"
          >
            {status === 'submitting' ? (
              <LoaderCircle size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
            {status === 'submitting' ? 'Dispatching request...' : 'Confirm Rescue Request'}
          </motion.button>
        </form>
      </motion.section>
    </motion.div>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="app-input"
      />
    </label>
  );
}

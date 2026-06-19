import { motion } from 'framer-motion';
import { BadgeCheck, LoaderCircle, MapPin, Radar, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

const defaultForm = {
  name: '',
  phone: '',
  speciality: '',
  basePrice: '1200',
  visit: '300',
  labor: '700',
  tow: '1800',
  whyAffordable: '',
  lat: '',
  lng: '',
};

export function MechanicRegistrationPanel({ locationState, onRegistered }) {
  const [form, setForm] = useState(defaultForm);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!locationState.coords) return;

    setForm((prev) => {
      if (prev.lat && prev.lng) return prev;

      return {
        ...prev,
        lat: String(locationState.coords.lat.toFixed(6)),
        lng: String(locationState.coords.lng.toFixed(6)),
      };
    });
  }, [locationState.coords]);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('submitting');
    setError(null);
    setSuccessMessage('');

    try {
      const payload = await apiFetch('/mechanics/register', {
        method: 'POST',
        body: {
          name: form.name,
          phone: form.phone,
          speciality: form.speciality,
          basePrice: Number(form.basePrice),
          pricing: {
            visit: Number(form.visit),
            labor: Number(form.labor),
            tow: Number(form.tow),
          },
          whyAffordable: form.whyAffordable,
          coords: {
            lat: Number(form.lat),
            lng: Number(form.lng),
          },
        },
      });

      setStatus('success');
      setSuccessMessage(
        `${payload.data.name} is now live in the nearby mechanic feed.`,
      );
      setForm(defaultForm);
      onRegistered(payload.data);
    } catch (submitError) {
      setStatus('error');
      setError(submitError.message);
    }
  }

  return (
    <div className="relative min-h-screen px-4 pb-28 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-md"
      >
        <div className="mb-5 rounded-[32px] border border-white/10 bg-white/[0.05] p-5 shadow-panel backdrop-blur-xl">
          <div className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-primaryGlow">
            <Wrench size={14} className="mr-2" />
            Mechanic Onboarding
          </div>
          <h1 className="text-3xl font-semibold">
            Join the premium roadside dispatch network
          </h1>
          <p className="mt-3 text-sm leading-6 text-textDim">
            Register your garage or mobile service unit so stranded drivers can
            find you instantly based on location, distance, and transparent pricing.
          </p>
        </div>

        <div className="mb-5 grid gap-3">
          <InfoCard
            icon={<Radar size={18} />}
            title="Live discovery"
            body="Your profile is matched against the driver's distance and budget filters in real time."
          />
          <InfoCard
            icon={<BadgeCheck size={18} />}
            title="Trust-first pricing"
            body="Show visit, labor, and tow pricing upfront to convert urgent roadside calls faster."
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-[32px] border border-white/10 bg-panel/85 p-5 shadow-panel backdrop-blur-xl"
        >
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Mechanic name"
              value={form.name}
              onChange={(name) => setForm((prev) => ({ ...prev, name }))}
              placeholder="TurboFix Garage"
            />
            <Field
              label="Phone"
              value={form.phone}
              onChange={(phone) => setForm((prev) => ({ ...prev, phone }))}
              placeholder="+91 98765 21001"
            />
          </div>

          <Field
            label="Speciality"
            value={form.speciality}
            onChange={(speciality) => setForm((prev) => ({ ...prev, speciality }))}
            placeholder="Battery jumpstarts and diagnostics"
          />

          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Base price"
              type="number"
              value={form.basePrice}
              onChange={(basePrice) => setForm((prev) => ({ ...prev, basePrice }))}
              placeholder="1200"
            />
            <Field
              label="Visit fee"
              type="number"
              value={form.visit}
              onChange={(visit) => setForm((prev) => ({ ...prev, visit }))}
              placeholder="300"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Labor fee"
              type="number"
              value={form.labor}
              onChange={(labor) => setForm((prev) => ({ ...prev, labor }))}
              placeholder="700"
            />
            <Field
              label="Tow fee"
              type="number"
              value={form.tow}
              onChange={(tow) => setForm((prev) => ({ ...prev, tow }))}
              placeholder="1800"
            />
          </div>

          <label className="block">
            <span className="mb-2 block text-sm text-white">Why affordable</span>
            <textarea
              rows="4"
              value={form.whyAffordable}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, whyAffordable: event.target.value }))
              }
              placeholder="Explain the low-overhead or local routing advantage."
              className="app-input min-h-28 resize-none"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Latitude"
              type="number"
              value={form.lat}
              onChange={(lat) => setForm((prev) => ({ ...prev, lat }))}
              placeholder="28.613900"
            />
            <Field
              label="Longitude"
              type="number"
              value={form.lng}
              onChange={(lng) => setForm((prev) => ({ ...prev, lng }))}
              placeholder="77.209000"
            />
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-white/75">
            <p className="inline-flex items-center gap-2">
              <MapPin size={14} className="text-primaryGlow" />
              {locationState.coords
                ? 'Current device location has been prefilled for faster onboarding.'
                : 'If location is unavailable, you can still type your workshop coordinates manually.'}
            </p>
          </div>

          {successMessage ? (
            <p className="text-sm text-emerald-300">{successMessage}</p>
          ) : null}
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
              <Wrench size={18} />
            )}
            {status === 'submitting' ? 'Publishing listing...' : 'Register Mechanic'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="app-input"
      />
    </label>
  );
}

function InfoCard({ icon, title, body }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-md">
      <div className="mb-3 inline-flex rounded-2xl border border-primary/20 bg-primary/10 p-3 text-primary">
        {icon}
      </div>
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-textDim">{body}</p>
    </div>
  );
}

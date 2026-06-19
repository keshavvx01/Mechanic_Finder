import { motion } from 'framer-motion';
import { BadgeCheck, Navigation, PhoneCall, ShieldCheck, Siren, Wallet } from 'lucide-react';

export function MechanicSheet({
  mechanic,
  userCoords,
  onClose,
  onRequestAssistance,
}) {
  const directionsHref = userCoords
    ? `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${userCoords.lat}%2C${userCoords.lng}%3B${mechanic.coords.lat}%2C${mechanic.coords.lng}`
    : `https://www.openstreetmap.org/?mlat=${mechanic.coords.lat}&mlon=${mechanic.coords.lng}#map=15/${mechanic.coords.lat}/${mechanic.coords.lng}`;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      className="pointer-events-none fixed inset-0 z-[1000] flex items-end justify-center"
    >
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="pointer-events-auto absolute inset-0 bg-black/35 backdrop-blur-[2px]"
      />
      <motion.section
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        className="pointer-events-auto relative w-full max-w-md rounded-t-[32px] border border-white/10 bg-panel/95 px-5 pb-8 pt-4 shadow-panel backdrop-blur-xl max-h-[85vh] overflow-y-auto"
      >
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/15" />
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <BadgeCheck size={14} />
              Low Cost Verified
            </p>
            <h2 className="text-2xl font-semibold">{mechanic.name}</h2>
            <p className="mt-1 text-sm text-textDim">
              {mechanic.distanceKm.toFixed(1)} km away • {mechanic.phone}
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 px-3 py-2 text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-textDim">From</p>
            <p className="text-lg font-semibold text-accent">Rs {mechanic.basePrice}</p>
          </div>
        </div>

        <div className="grid gap-3 rounded-[28px] border border-white/10 bg-white/5 p-4">
          <InfoRow
            icon={<ShieldCheck size={16} />}
            label="Service"
            value={mechanic.speciality}
          />
          <InfoRow
            icon={<Wallet size={16} />}
            label="Pricing"
            value={`Visit Rs ${mechanic.pricing.visit} • Fix Rs ${mechanic.pricing.labor} • Tow Rs ${mechanic.pricing.tow}`}
          />
          <InfoRow
            icon={<BadgeCheck size={16} />}
            label="Why cheaper"
            value={mechanic.whyAffordable}
          />
        </div>

        <div className="mt-5">
          <ActionButton
            as="button"
            type="button"
            icon={<Siren size={18} />}
            label="Request Rescue"
            onClick={onRequestAssistance}
          />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <ActionButton
            as="a"
            href={`tel:${mechanic.phone.replace(/\s+/g, '')}`}
            icon={<PhoneCall size={18} />}
            label="Call Mechanic"
          />
          <ActionButton
            as="a"
            href={directionsHref}
            icon={<Navigation size={18} />}
            label="Get Directions"
            secondary
            target="_blank"
            rel="noreferrer"
          />
        </div>
      </motion.section>
    </motion.div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 rounded-2xl border border-white/10 bg-black/20 p-2 text-primary">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-textDim">{label}</p>
        <p className="mt-1 text-sm text-white">{value}</p>
      </div>
    </div>
  );
}

function ActionButton({
  as: Component,
  href,
  icon,
  label,
  secondary = false,
  onClick,
  type,
  target,
  rel,
}) {
  return (
    <motion.div whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.01 }}>
      <Component
        href={href}
        onClick={onClick}
        type={type}
        target={target}
        rel={rel}
        className={[
          'flex items-center justify-center gap-2 rounded-3xl px-4 py-4 text-sm font-medium transition',
          secondary
            ? 'border border-white/10 bg-white/5 text-white'
            : 'bg-primary text-black shadow-glow',
        ].join(' ')}
      >
        {icon}
        {label}
      </Component>
    </motion.div>
  );
}

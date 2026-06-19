import { motion } from 'framer-motion';
import { CarFront, Wrench } from 'lucide-react';

export function RoleDock({ mode, onChange }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[920] flex justify-center px-4">
      <div className="pointer-events-auto flex w-full max-w-xs items-center gap-2 rounded-full border border-white/10 bg-black/35 p-2 shadow-panel backdrop-blur-xl">
        <RoleButton
          active={mode === 'driver'}
          icon={<CarFront size={16} />}
          label="Driver"
          onClick={() => onChange('driver')}
        />
        <RoleButton
          active={mode === 'mechanic'}
          icon={<Wrench size={16} />}
          label="Mechanic"
          onClick={() => onChange('mechanic')}
        />
      </div>
    </div>
  );
}

function RoleButton({ active, icon, label, onClick }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={[
        'relative flex-1 overflow-hidden rounded-full px-4 py-3 text-sm font-medium transition',
        active ? 'text-black' : 'text-white/72',
      ].join(' ')}
    >
      {active ? (
        <motion.span
          layoutId="role-pill"
          className="pointer-events-none absolute inset-0 rounded-full bg-primary shadow-glow"
        />
      ) : null}
      <span className="relative flex items-center justify-center gap-2">
        {icon}
        {label}
      </span>
    </motion.button>
  );
}

import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';

export function FilterBar({ filters, onChange, resultCount }) {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[900] px-4 pt-4"
    >
      <div className="pointer-events-auto mx-auto max-w-md rounded-[28px] border border-white/10 bg-white/8 p-4 shadow-panel backdrop-blur-md">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-primaryGlow/80">
              Scan Nearby
            </p>
            <h1 className="text-base font-semibold text-white">
              Rescue Mechanics
            </h1>
            <p className="mt-1 text-xs text-textDim">
              {resultCount} verified matches in your current range
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/6 p-2 text-primary">
            <SlidersHorizontal size={18} />
          </div>
        </div>

        <div className="space-y-4">
          <RangeField
            label={`Distance ${filters.distanceKm} km`}
            min={1}
            max={10}
            step={1}
            value={filters.distanceKm}
            onChange={(distanceKm) => onChange((prev) => ({ ...prev, distanceKm }))}
          />
          <RangeField
            label={`Budget Rs ${filters.budget}`}
            min={500}
            max={5000}
            step={250}
            value={filters.budget}
            onChange={(budget) => onChange((prev) => ({ ...prev, budget }))}
          />
        </div>
      </div>
    </motion.header>
  );
}

function RangeField({ label, value, onChange, min, max, step }) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between text-sm text-white">
        <span>{label}</span>
        <span className="text-xs text-textDim">
          {min} - {max}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="range-input"
      />
    </label>
  );
}

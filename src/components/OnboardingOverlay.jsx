import { motion } from 'framer-motion';
import { MapPinned, MoveRight, Radar, ShieldCheck } from 'lucide-react';

export function OnboardingOverlay({ onEnter, locationState }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1200] overflow-y-auto bg-app"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,139,43,0.22),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.12),transparent_22%)]" />

      <div className="relative flex min-h-screen flex-col justify-between px-5 pb-8 pt-10">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-5"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-primaryGlow">
            <Radar size={14} />
            Mechanic Finder
          </div>

          <div className="space-y-4">
            <h1 className="max-w-sm text-4xl font-semibold leading-tight">
              Your fastest route from breakdown to backup.
            </h1>
            <p className="max-w-sm text-sm leading-6 text-textDim">
              Discover verified low-cost mechanics nearby with live distance,
              transparent pricing, and a map flow designed for stressful roadside moments.
            </p>
          </div>
        </motion.div>

        <div className="space-y-4">
          <motion.div
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="grid gap-3"
          >
            <Panel
              icon={<MapPinned size={18} />}
              title="Precise location sync"
              body="We use your live position to surface the nearest mechanics and compute distance instantly."
            />
            <Panel
              icon={<ShieldCheck size={18} />}
              title="Price-first trust layer"
              body="Every listed mechanic includes a clear visit, labor, and towing estimate before you call."
            />
          </motion.div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.97 }}
            onClick={onEnter}
            className="group relative flex w-full items-center justify-between overflow-hidden rounded-[30px] border border-primary/20 bg-primary px-5 py-4 text-left text-black shadow-glow"
          >
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.25),transparent_50%,rgba(255,255,255,0.18))] opacity-70" />
            <span className="relative">
              <span className="block text-sm font-medium">Enable live roadside scan</span>
              <span className="block text-xs text-black/70">
                {locationState.status === 'error'
                  ? 'You can still continue with a default area.'
                  : 'Location prompt appears after entering the map.'}
              </span>
            </span>
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.6 }}
              className="relative rounded-full bg-black/10 p-3"
            >
              <MoveRight size={18} />
            </motion.span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function Panel({ icon, title, body }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-[28px] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-md"
    >
      <div className="mb-3 inline-flex rounded-2xl border border-primary/20 bg-primary/10 p-3 text-primary">
        {icon}
      </div>
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-textDim">{body}</p>
    </motion.div>
  );
}

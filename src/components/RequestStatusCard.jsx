import { motion } from 'framer-motion';
import { BadgeCheck, Clock3, X } from 'lucide-react';

export function RequestStatusCard({ request, onDismiss }) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[930] px-4"
    >
      <div className="pointer-events-auto mx-auto max-w-md rounded-[28px] border border-emerald-400/20 bg-emerald-500/10 p-4 shadow-panel backdrop-blur-xl">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-emerald-300">
              <BadgeCheck size={14} />
              Request Created
            </p>
            <h3 className="mt-3 text-lg font-semibold text-white">
              {request.mechanicSnapshot.name} is on standby
            </h3>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            className="rounded-2xl border border-white/10 bg-black/20 p-2 text-white/75"
          >
            <X size={16} />
          </button>
        </div>

        <div className="grid gap-2 text-sm text-white/80">
          <p>Request ID: {request.requestNumber}</p>
          <p>Status: {request.status}</p>
          <p className="inline-flex items-center gap-2">
            <Clock3 size={14} className="text-primaryGlow" />
            Estimated arrival: {request.estimatedArrivalMinutes} min
          </p>
        </div>
      </div>
    </motion.aside>
  );
}

import { useEffect, useState } from 'react';

const EXIT_DURATION_MS = 240;

export function useAnimatedMechanics(mechanics) {
  const [rendered, setRendered] = useState(mechanics);

  useEffect(() => {
    setRendered((current) => {
      const incomingIds = new Set(mechanics.map((mechanic) => mechanic.id));
      const next = current.map((mechanic) =>
        incomingIds.has(mechanic.id) ? { ...mechanic, isExiting: false } : { ...mechanic, isExiting: true },
      );

      mechanics.forEach((mechanic) => {
        if (!next.some((item) => item.id === mechanic.id)) {
          next.push({ ...mechanic, isExiting: false });
        }
      });

      return next;
    });

    const timeout = window.setTimeout(() => {
      setRendered(mechanics.map((mechanic) => ({ ...mechanic, isExiting: false })));
    }, EXIT_DURATION_MS);

    return () => window.clearTimeout(timeout);
  }, [mechanics]);

  return rendered;
}

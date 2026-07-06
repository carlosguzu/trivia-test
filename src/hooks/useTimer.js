// Reusable countdown timer hook.
// Extracted from App.js to decouple timer logic from game logic.

import { useState, useEffect, useRef, useCallback } from 'react';
import { TIMER_UPDATE_INTERVAL } from '../constants/config';

export function useTimer(duration, { paused = false, onTimeout }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerRef = useRef(null);
  const onTimeoutRef = useRef(onTimeout);

  // Keep callback ref in sync without triggering effect re-runs.
  useEffect(() => {
    onTimeoutRef.current = onTimeout;
  }, [onTimeout]);

  useEffect(() => {
    if (paused) return;

    // Reset to full duration whenever the timer starts (e.g. new question).
    setTimeLeft(duration);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= TIMER_UPDATE_INTERVAL) {
          clearInterval(timerRef.current);
          onTimeoutRef.current?.();
          return 0;
        }
        return prev - TIMER_UPDATE_INTERVAL;
      });
    }, TIMER_UPDATE_INTERVAL * 1000);

    return () => clearInterval(timerRef.current);
  }, [paused, duration]);

  const stop = useCallback(() => {
    clearInterval(timerRef.current);
  }, []);

  const reset = useCallback(() => {
    clearInterval(timerRef.current);
    setTimeLeft(duration);
  }, [duration]);

  return { timeLeft, stop, reset };
}

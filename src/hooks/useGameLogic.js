// Reusable game state management hook.
// Encapsulates trivia navigation, scoring, and answer handling.

import { useState, useCallback } from 'react';
import { QUESTIONS } from '../questions';
import { TIME_PER_QUESTION, ANSWER_DELAY } from '../constants/config';
import { useTimer } from './useTimer';

export function useGameLogic() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[current];

  const goNext = useCallback(() => {
    if (current + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }, [current]);

  const handleTimeout = useCallback(() => {
    setSelected(-1);
    setTimeout(goNext, ANSWER_DELAY);
  }, [goNext]);

  const { timeLeft, stop: stopTimer, reset: resetTimer } = useTimer(
    TIME_PER_QUESTION,
    { paused: finished || selected !== null, onTimeout: handleTimeout }
  );

  const handleAnswer = useCallback(
    (index) => {
      if (selected !== null) return;
      stopTimer();
      setSelected(index);
      if (index === question.answer) {
        setScore((s) => s + 1);
      }
      setTimeout(goNext, ANSWER_DELAY);
    },
    [selected, stopTimer, question, goNext]
  );

  const restart = useCallback(() => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    resetTimer();
  }, [resetTimer]);

  return {
    current,
    selected,
    score,
    timeLeft,
    finished,
    question,
    totalQuestions: QUESTIONS.length,
    handleAnswer,
    restart,
  };
}

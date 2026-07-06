import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import App from '../App';
import { QUESTIONS } from '../src/questions';

// The timer/advance logic relies on setInterval + setTimeout, so drive it with
// fake timers rather than waiting on the real clock.
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
});

// Answer the current question (correctly or not) and let the 1.2s delay elapse
// so the quiz advances to the next question.
function answerAndAdvance(screen, optionText) {
  fireEvent.press(screen.getByText(optionText));
  act(() => {
    jest.advanceTimersByTime(1200);
  });
}

function correctOptionFor(index) {
  const q = QUESTIONS[index];
  return q.options[q.answer];
}

function wrongOptionFor(index) {
  const q = QUESTIONS[index];
  const wrongIdx = q.answer === 0 ? 1 : 0;
  return q.options[wrongIdx];
}

describe('App (trivia flow)', () => {
  it('renders the first question and progress header', () => {
    const screen = render(<App />);
    expect(screen.getByText(`Pregunta 1 de ${QUESTIONS.length}`)).toBeTruthy();
    expect(screen.getByText(QUESTIONS[0].question)).toBeTruthy();
  });

  it('advances to the next question after answering', () => {
    const screen = render(<App />);
    answerAndAdvance(screen, correctOptionFor(0));
    expect(screen.getByText(`Pregunta 2 de ${QUESTIONS.length}`)).toBeTruthy();
    expect(screen.getByText(QUESTIONS[1].question)).toBeTruthy();
  });

  it('gives a perfect score when every answer is correct', () => {
    const screen = render(<App />);
    for (let i = 0; i < QUESTIONS.length; i++) {
      answerAndAdvance(screen, correctOptionFor(i));
    }
    expect(screen.getByText('¡Terminaste!')).toBeTruthy();
    expect(screen.getByText(`${QUESTIONS.length} / ${QUESTIONS.length}`)).toBeTruthy();
    expect(
      screen.getByText('¡Excelente! Sabes mucho de Microsoft.')
    ).toBeTruthy();
  });

  it('scores zero when every answer is wrong', () => {
    const screen = render(<App />);
    for (let i = 0; i < QUESTIONS.length; i++) {
      answerAndAdvance(screen, wrongOptionFor(i));
    }
    expect(screen.getByText(`0 / ${QUESTIONS.length}`)).toBeTruthy();
    expect(screen.getByText('Sigue practicando 💪')).toBeTruthy();
  });

  it('counts down the on-screen timer as time passes', () => {
    const screen = render(<App />);
    // The timer starts at the full 12 seconds.
    expect(screen.getByText('12')).toBeTruthy();
    // After ~2.2s elapsed, ~9.8s remain -> ceil is 10.
    act(() => {
      jest.advanceTimersByTime(2200);
    });
    expect(screen.getByText('10')).toBeTruthy();
    // The question does not change just because time passed.
    expect(screen.getByText(`Pregunta 1 de ${QUESTIONS.length}`)).toBeTruthy();
  });

  it('restarts the quiz from the results screen', () => {
    const screen = render(<App />);
    for (let i = 0; i < QUESTIONS.length; i++) {
      answerAndAdvance(screen, correctOptionFor(i));
    }
    expect(screen.getByText('¡Terminaste!')).toBeTruthy();

    fireEvent.press(screen.getByText('Jugar de nuevo'));
    expect(screen.getByText(`Pregunta 1 de ${QUESTIONS.length}`)).toBeTruthy();
    expect(screen.getByText(QUESTIONS[0].question)).toBeTruthy();
  });

  it('ignores a second answer on the same question', () => {
    const screen = render(<App />);
    fireEvent.press(screen.getByText(correctOptionFor(0)));
    // A second press must not change score or double-advance.
    fireEvent.press(screen.getByText(wrongOptionFor(0)));
    act(() => {
      jest.advanceTimersByTime(1200);
    });
    expect(screen.getByText(`Pregunta 2 de ${QUESTIONS.length}`)).toBeTruthy();
  });
});

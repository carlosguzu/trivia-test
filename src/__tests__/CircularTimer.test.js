import React from 'react';
import { render } from '@testing-library/react-native';
import { Circle } from 'react-native-svg';
import CircularTimer from '../CircularTimer';

// Helper: render and return the progress <Circle> (the second one drawn)
// and the text nodes so we can assert on the timer's computed values.
function renderTimer(props) {
  const utils = render(<CircularTimer {...props} />);
  const circles = utils.UNSAFE_getAllByType(Circle);
  return { ...utils, backgroundCircle: circles[0], progressCircle: circles[1] };
}

describe('CircularTimer', () => {
  it('shows the ceiling of the remaining seconds', () => {
    // 7.2 seconds rounds up to 8.
    const { getByText } = renderTimer({ timeLeft: 7.2, total: 12 });
    expect(getByText('8')).toBeTruthy();
    expect(getByText('seg')).toBeTruthy();

    // A whole number is shown as-is.
    const { getByText: getByText2 } = renderTimer({ timeLeft: 5, total: 12 });
    expect(getByText2('5')).toBeTruthy();
  });

  it('never displays a negative number of seconds', () => {
    const { getByText } = renderTimer({ timeLeft: -5, total: 12 });
    expect(getByText('0')).toBeTruthy();
  });

  it('uses green while there is plenty of time (> 6s)', () => {
    const { progressCircle } = renderTimer({ timeLeft: 10, total: 12 });
    expect(progressCircle.props.stroke).toBe('#22c55e');
  });

  it('uses amber when 6s or less remain', () => {
    const { progressCircle } = renderTimer({ timeLeft: 6, total: 12 });
    expect(progressCircle.props.stroke).toBe('#f59e0b');
  });

  it('uses red when 3s or less remain', () => {
    const { progressCircle } = renderTimer({ timeLeft: 3, total: 12 });
    expect(progressCircle.props.stroke).toBe('#ef4444');
  });

  it('computes stroke geometry from size and strokeWidth', () => {
    const size = 120;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const { progressCircle } = renderTimer({
      timeLeft: 12,
      total: 12,
      size,
      strokeWidth,
    });

    expect(progressCircle.props.strokeDasharray).toBeCloseTo(circumference);
    // Full time remaining => nothing hidden => offset 0.
    expect(progressCircle.props.strokeDashoffset).toBeCloseTo(0);
  });

  it('hides half the circle when half the time is left', () => {
    const size = 120;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const { progressCircle } = renderTimer({ timeLeft: 6, total: 12, size, strokeWidth });
    expect(progressCircle.props.strokeDashoffset).toBeCloseTo(circumference * 0.5);
  });

  it('clamps progress so a negative timeLeft hides the whole circle', () => {
    const size = 120;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const { progressCircle } = renderTimer({ timeLeft: -3, total: 12, size, strokeWidth });
    expect(progressCircle.props.strokeDashoffset).toBeCloseTo(circumference);
  });
});

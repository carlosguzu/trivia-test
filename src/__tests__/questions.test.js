import { QUESTIONS } from '../questions';

describe('QUESTIONS data set', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(QUESTIONS)).toBe(true);
    expect(QUESTIONS.length).toBeGreaterThan(0);
  });

  it('has the expected number of questions', () => {
    expect(QUESTIONS).toHaveLength(11);
  });

  it.each(QUESTIONS.map((q, i) => [i, q]))(
    'question %i has a valid shape',
    (_index, q) => {
      expect(typeof q.question).toBe('string');
      expect(q.question.trim().length).toBeGreaterThan(0);

      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options).toHaveLength(4);
      q.options.forEach((opt) => {
        expect(typeof opt).toBe('string');
        expect(opt.trim().length).toBeGreaterThan(0);
      });

      expect(Number.isInteger(q.answer)).toBe(true);
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(q.options.length);
    }
  );

  it('has unique options within each question', () => {
    QUESTIONS.forEach((q) => {
      const unique = new Set(q.options);
      expect(unique.size).toBe(q.options.length);
    });
  });

  it('has a non-empty correct answer for every question', () => {
    QUESTIONS.forEach((q) => {
      const correct = q.options[q.answer];
      expect(typeof correct).toBe('string');
      expect(correct.trim().length).toBeGreaterThan(0);
    });
  });
});

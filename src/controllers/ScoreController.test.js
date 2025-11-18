// src/controllers/ScoreController.test.js
import ScoreController from './ScoreController';

describe('ScoreController', () => {
    const mockQuestions = [
        {
            id: 1,
            question: "What is 2+2?",
            answers: [
                { answer: "4", isCorrect: true },
                { answer: "5", isCorrect: false }
            ]
        },
        {
            id: 2,
            question: "What is the capital of France?",
            answers: [
                { answer: "London", isCorrect: false },
                { answer: "Paris", isCorrect: true }
            ]
        },
        {
            id: 3,
            question: "Is the sky blue?",
            answers: [
                { answer: "Yes", isCorrect: true },
                { answer: "No", isCorrect: false }
            ]
        }
    ];

    describe('calculateScore', () => {
        test('calculates perfect score correctly', () => {
            const userAnswers = {
                1: { answer: "4", isCorrect: true },
                2: { answer: "Paris", isCorrect: true },
                3: { answer: "Yes", isCorrect: true }
            };

            const result = ScoreController.calculateScore(mockQuestions, userAnswers);
            
            expect(result.score).toBe(3);
            expect(result.total).toBe(3);
            expect(result.percentage).toBe(100);
        });

        test('calculates partial score correctly', () => {
            const userAnswers = {
                1: { answer: "4", isCorrect: true },
                2: { answer: "London", isCorrect: false },
                3: { answer: "Yes", isCorrect: true }
            };

            const result = ScoreController.calculateScore(mockQuestions, userAnswers);
            
            expect(result.score).toBe(2);
            expect(result.total).toBe(3);
            expect(result.percentage).toBe(67);
        });

        test('calculates zero score correctly', () => {
            const userAnswers = {
                1: { answer: "5", isCorrect: false },
                2: { answer: "London", isCorrect: false },
                3: { answer: "No", isCorrect: false }
            };

            const result = ScoreController.calculateScore(mockQuestions, userAnswers);
            
            expect(result.score).toBe(0);
            expect(result.total).toBe(3);
            expect(result.percentage).toBe(0);
        });

        test('handles empty answers', () => {
            const userAnswers = {};

            const result = ScoreController.calculateScore(mockQuestions, userAnswers);
            
            expect(result.score).toBe(0);
            expect(result.total).toBe(3);
            expect(result.percentage).toBe(0);
        });

        test('handles empty questions array', () => {
            const userAnswers = { 1: { answer: "4", isCorrect: true } };

            const result = ScoreController.calculateScore([], userAnswers);
            
            expect(result.score).toBe(0);
            expect(result.total).toBe(0);
            expect(result.percentage).toBe(0);
        });
    });

    describe('validateAnswer', () => {
        test('returns true for correct answer', () => {
            const answer = { answer: "4", isCorrect: true };
            expect(ScoreController.validateAnswer(answer)).toBe(true);
        });

        test('returns false for incorrect answer', () => {
            const answer = { answer: "5", isCorrect: false };
            expect(ScoreController.validateAnswer(answer)).toBe(false);
        });

        test('returns false for null answer', () => {
            expect(ScoreController.validateAnswer(null)).toBe(false);
        });

        test('returns false for undefined answer', () => {
            expect(ScoreController.validateAnswer(undefined)).toBe(false);
        });
    });

    describe('getFeedback', () => {
        test('returns excellent feedback for 90%+', () => {
            expect(ScoreController.getFeedback(100)).toBe("Excellent! Outstanding performance!");
            expect(ScoreController.getFeedback(95)).toBe("Excellent! Outstanding performance!");
            expect(ScoreController.getFeedback(90)).toBe("Excellent! Outstanding performance!");
        });

        test('returns great feedback for 80-89%', () => {
            expect(ScoreController.getFeedback(89)).toBe("Great job! Very good work!");
            expect(ScoreController.getFeedback(85)).toBe("Great job! Very good work!");
            expect(ScoreController.getFeedback(80)).toBe("Great job! Very good work!");
        });

        test('returns good feedback for 70-79%', () => {
            expect(ScoreController.getFeedback(79)).toBe("Good work! Keep it up!");
            expect(ScoreController.getFeedback(75)).toBe("Good work! Keep it up!");
            expect(ScoreController.getFeedback(70)).toBe("Good work! Keep it up!");
        });

        test('returns not bad feedback for 60-69%', () => {
            expect(ScoreController.getFeedback(69)).toBe("Not bad! Room for improvement.");
            expect(ScoreController.getFeedback(65)).toBe("Not bad! Room for improvement.");
            expect(ScoreController.getFeedback(60)).toBe("Not bad! Room for improvement.");
        });

        test('returns practice feedback for below 60%', () => {
            expect(ScoreController.getFeedback(59)).toBe("Keep practicing! You'll get better!");
            expect(ScoreController.getFeedback(30)).toBe("Keep practicing! You'll get better!");
            expect(ScoreController.getFeedback(0)).toBe("Keep practicing! You'll get better!");
        });
    });

    describe('formatScore', () => {
        test('formats score correctly', () => {
            expect(ScoreController.formatScore(3, 5)).toBe("3/5");
            expect(ScoreController.formatScore(0, 10)).toBe("0/10");
            expect(ScoreController.formatScore(10, 10)).toBe("10/10");
        });
    });
});
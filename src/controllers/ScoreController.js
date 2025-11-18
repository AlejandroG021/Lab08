// src/controllers/ScoreController.js

class ScoreController {
    /**
     * Calculate the score based on user answers
     * @param {Array} questions - Array of question objects
     * @param {Object} userAnswers - Object mapping question IDs to selected answers
     * @returns {Object} Score results with score, total, and percentage
     */
    static calculateScore(questions, userAnswers) {
        let score = 0;
        const total = questions.length;

        questions.forEach(question => {
            const userAnswer = userAnswers[question.id];
            if (userAnswer && userAnswer.isCorrect) {
                score++;
            }
        });

        return {
            score,
            total,
            percentage: total > 0 ? Math.round((score / total) * 100) : 0
        };
    }

    /**
     * Validate if an answer is correct
     * @param {Object} answer - Answer object with isCorrect property
     * @returns {boolean} True if answer is correct
     */
    static validateAnswer(answer) {
        if (!answer) {
            return false;
        }
        return answer.isCorrect === true;
    }

    /**
     * Get feedback message based on score percentage
     * @param {number} percentage - Score percentage
     * @returns {string} Feedback message
     */
    static getFeedback(percentage) {
        if (percentage >= 90) return "Excellent! Outstanding performance!";
        if (percentage >= 80) return "Great job! Very good work!";
        if (percentage >= 70) return "Good work! Keep it up!";
        if (percentage >= 60) return "Not bad! Room for improvement.";
        return "Keep practicing! You'll get better!";
    }

    /**
     * Format score display
     * @param {number} score - Number of correct answers
     * @param {number} total - Total number of questions
     * @returns {string} Formatted score string
     */
    static formatScore(score, total) {
        return `${score}/${total}`;
    }
}

export default ScoreController;
// src/components/Quiz.js
import React from 'react';
import quizPageStyle from '../QuizPageStyle';
import my_questions from '../model/basic_questions.json';
import ScoreController from '../controllers/ScoreController';

class Quiz extends React.Component {
    state = {
        userAnswers: {},
        submitted: false,
        scoreData: null
    };
    
    handleAnswerSelect = (questionId, answer) => {
        // Only allow selection if not submitted
        if (this.state.submitted) return;

        this.setState(prevState => ({
            userAnswers: {
                ...prevState.userAnswers,
                [questionId]: answer
            }
        }));
    };

    handleSubmit = () => {
        const { userAnswers } = this.state;
        
        // Calculate score using the controller
        const scoreData = ScoreController.calculateScore(my_questions, userAnswers);
        const feedback = ScoreController.getFeedback(scoreData.percentage);
        
        this.setState({
            submitted: true,
            scoreData
        });

        alert(`Quiz Completed!\n\nScore: ${ScoreController.formatScore(scoreData.score, scoreData.total)}\nPercentage: ${scoreData.percentage}%\n\n${feedback}`);
    };

    handleReset = () => {
        this.setState({
            userAnswers: {},
            submitted: false,
            scoreData: null
        });
    };

    navigateToResults = () => {
        if (this.props.onNavigate) {
            this.props.onNavigate('results', this.state.scoreData);
        }
    };
    
    render() {
        const { userAnswers, submitted, scoreData } = this.state;

        return(
            <div style={quizPageStyle}>
                <h1>📚 Knowledge Quiz</h1>
                
                {submitted && scoreData && (
                    <div style={{
                        backgroundColor: '#2c5aa0',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        border: '2px solid white'
                    }}>
                        <h2>Your Results</h2>
                        <p style={{ fontSize: '24px', margin: '10px 0' }}>
                            Score: {ScoreController.formatScore(scoreData.score, scoreData.total)}
                        </p>
                        <p style={{ fontSize: '20px', margin: '10px 0' }}>
                            Percentage: {scoreData.percentage}%
                        </p>
                        <p style={{ fontSize: '18px', fontStyle: 'italic' }}>
                            {ScoreController.getFeedback(scoreData.percentage)}
                        </p>
                    </div>
                )}

                {my_questions.map((quest) => {
                    const selectedAnswer = userAnswers[quest.id];
                    
                    return (
                        <div key={quest.id} style={{
                            backgroundColor: '#1e4d8b',
                            padding: '20px',
                            margin: '15px 0',
                            borderRadius: '10px',
                            border: submitted && selectedAnswer ? 
                                (selectedAnswer.isCorrect ? '3px solid #4CAF50' : '3px solid #f44336') : 
                                '2px solid white'
                        }}> 
                            <h2>{quest.question}</h2>
                            {quest.answers.map((ans, idx) => {
                                const isSelected = selectedAnswer?.answer === ans.answer;
                                const showCorrect = submitted && ans.isCorrect;
                                
                                return (
                                    <div key={idx} style={{
                                        backgroundColor: showCorrect ? '#4CAF50' : 
                                                       (submitted && isSelected && !ans.isCorrect) ? '#f44336' : 
                                                       'transparent',
                                        padding: '8px',
                                        margin: '5px 0',
                                        borderRadius: '5px'
                                    }}>
                                        <label style={{ cursor: submitted ? 'default' : 'pointer' }}>
                                            <input  
                                                type="radio"
                                                name={quest.id}
                                                checked={isSelected}
                                                onChange={() => this.handleAnswerSelect(quest.id, ans)}
                                                disabled={submitted}
                                                style={{ cursor: submitted ? 'default' : 'pointer' }}
                                            /> 
                                            {ans.answer}
                                            {submitted && ans.isCorrect && ' ✓'}
                                            {submitted && isSelected && !ans.isCorrect && ' ✗'}
                                        </label> 
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
                
                <div style={{ marginTop: '20px' }}>
                    {!submitted ? (
                        <button 
                            onClick={this.handleSubmit}
                            disabled={Object.keys(userAnswers).length !== my_questions.length}
                            style={{
                                padding: '12px 30px',
                                fontSize: '18px',
                                backgroundColor: Object.keys(userAnswers).length === my_questions.length ? '#4CAF50' : '#cccccc',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: Object.keys(userAnswers).length === my_questions.length ? 'pointer' : 'not-allowed',
                                fontWeight: 'bold'
                            }}
                        >
                            Submit Quiz
                        </button>
                    ) : (
                        <div>
                            <button 
                                onClick={this.handleReset}
                                style={{
                                    padding: '12px 30px',
                                    fontSize: '18px',
                                    backgroundColor: '#FF9800',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    marginRight: '10px'
                                }}
                            >
                                Try Again
                            </button>
                            {this.props.onNavigate && (
                                <button 
                                    onClick={this.navigateToResults}
                                    style={{
                                        padding: '12px 30px',
                                        fontSize: '18px',
                                        backgroundColor: '#2196F3',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    View Detailed Results
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Quiz;
// src/components/ResultsPage.js
import React from 'react';
import ScoreController from '../controllers/ScoreController';

const ResultsPage = ({ scoreData, onNavigate }) => {
    if (!scoreData) {
        return (
            <div style={pageStyle}>
                <h1>No Results Available</h1>
                <p>Please take the quiz first to see your results.</p>
                <button onClick={() => onNavigate('quiz')} style={buttonStyle}>
                    Go to Quiz
                </button>
            </div>
        );
    }

    const { score, total, percentage } = scoreData;
    const feedback = ScoreController.getFeedback(percentage);

    // Determine performance level and color
    let performanceLevel = '';
    let performanceColor = '';
    
    if (percentage >= 90) {
        performanceLevel = 'Outstanding';
        performanceColor = '#4CAF50';
    } else if (percentage >= 80) {
        performanceLevel = 'Excellent';
        performanceColor = '#8BC34A';
    } else if (percentage >= 70) {
        performanceLevel = 'Good';
        performanceColor = '#FFC107';
    } else if (percentage >= 60) {
        performanceLevel = 'Fair';
        performanceColor = '#FF9800';
    } else {
        performanceLevel = 'Needs Improvement';
        performanceColor = '#F44336';
    }

    return (
        <div style={pageStyle}>
            <h1>📊 Detailed Quiz Results</h1>
            
            <div style={{
                ...cardStyle,
                backgroundColor: performanceColor,
                marginBottom: '30px'
            }}>
                <h2 style={{ fontSize: '36px', margin: '10px 0' }}>
                    {ScoreController.formatScore(score, total)}
                </h2>
                <p style={{ fontSize: '28px', margin: '10px 0' }}>
                    {percentage}%
                </p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>
                    {performanceLevel}
                </p>
            </div>

            <div style={cardStyle}>
                <h3>Performance Analysis</h3>
                <div style={{ textAlign: 'left', padding: '10px' }}>
                    <p><strong>Questions Answered:</strong> {total}</p>
                    <p><strong>Correct Answers:</strong> {score}</p>
                    <p><strong>Incorrect Answers:</strong> {total - score}</p>
                    <p><strong>Accuracy Rate:</strong> {percentage}%</p>
                </div>
            </div>

            <div style={cardStyle}>
                <h3>Feedback</h3>
                <p style={{ fontSize: '20px', fontStyle: 'italic', padding: '10px' }}>
                    {feedback}
                </p>
            </div>

            <div style={cardStyle}>
                <h3>Performance Bar</h3>
                <div style={{
                    width: '100%',
                    height: '40px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    margin: '20px 0'
                }}>
                    <div style={{
                        width: `${percentage}%`,
                        height: '100%',
                        backgroundColor: performanceColor,
                        transition: 'width 1s ease-in-out',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold'
                    }}>
                        {percentage}%
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '30px' }}>
                <button 
                    onClick={() => onNavigate('quiz')}
                    style={{
                        ...buttonStyle,
                        backgroundColor: '#2196F3',
                        marginRight: '10px'
                    }}
                >
                    Back to Quiz
                </button>
                <button 
                    onClick={() => onNavigate('home')}
                    style={{
                        ...buttonStyle,
                        backgroundColor: '#4CAF50'
                    }}
                >
                    Home
                </button>
            </div>
        </div>
    );
};

const pageStyle = {
    color: 'white',
    backgroundColor: '#1a237e',
    padding: '30px',
    fontFamily: 'Sans-Serif',
    minHeight: '100vh',
    textAlign: 'center'
};

const cardStyle = {
    backgroundColor: '#283593',
    padding: '25px',
    margin: '20px auto',
    borderRadius: '15px',
    maxWidth: '600px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    border: '2px solid white'
};

const buttonStyle = {
    padding: '12px 30px',
    fontSize: '18px',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    margin: '5px'
};

export default ResultsPage;
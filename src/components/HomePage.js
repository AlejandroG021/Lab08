// src/components/HomePage.js
import React from 'react';

const HomePage = ({ onNavigate }) => {
    return (
        <div style={pageStyle}>
            <div style={containerStyle}>
                <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
                    🎓 Welcome to the Quiz App
                </h1>
                
                <p style={{ fontSize: '20px', marginBottom: '30px', lineHeight: '1.6' }}>
                    Test your knowledge with our interactive quiz system!
                    Answer questions and get instant feedback on your performance.
                </p>

                <div style={featuresContainer}>
                    <div style={featureCard}>
                        <span style={{ fontSize: '48px' }}>📝</span>
                        <h3>Multiple Choice</h3>
                        <p>Answer carefully selected questions</p>
                    </div>
                    
                    <div style={featureCard}>
                        <span style={{ fontSize: '48px' }}>📊</span>
                        <h3>Instant Scoring</h3>
                        <p>Get immediate feedback on your answers</p>
                    </div>
                    
                    <div style={featureCard}>
                        <span style={{ fontSize: '48px' }}>🏆</span>
                        <h3>Detailed Results</h3>
                        <p>View comprehensive performance analysis</p>
                    </div>
                </div>

                <button 
                    onClick={() => onNavigate('quiz')}
                    style={startButtonStyle}
                >
                    Start Quiz →
                </button>

                <div style={infoSection}>
                    <h3>How It Works</h3>
                    <ol style={{ textAlign: 'left', maxWidth: '500px', margin: '20px auto' }}>
                        <li style={{ marginBottom: '10px' }}>Click "Start Quiz" to begin</li>
                        <li style={{ marginBottom: '10px' }}>Read each question carefully</li>
                        <li style={{ marginBottom: '10px' }}>Select your answer for each question</li>
                        <li style={{ marginBottom: '10px' }}>Submit when you're ready</li>
                        <li style={{ marginBottom: '10px' }}>View your detailed results and feedback</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

const pageStyle = {
    color: 'white',
    backgroundColor: '#0d47a1',
    padding: '40px 20px',
    fontFamily: 'Sans-Serif',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const containerStyle = {
    maxWidth: '1000px',
    textAlign: 'center'
};

const featuresContainer = {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    margin: '40px 0',
    gap: '20px'
};

const featureCard = {
    backgroundColor: '#1565c0',
    padding: '30px',
    borderRadius: '15px',
    minWidth: '200px',
    maxWidth: '250px',
    flex: '1',
    border: '2px solid white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
};

const startButtonStyle = {
    padding: '18px 50px',
    fontSize: '24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s',
    marginTop: '20px'
};

const infoSection = {
    backgroundColor: '#1565c0',
    padding: '30px',
    borderRadius: '15px',
    marginTop: '40px',
    border: '2px solid white'
};

export default HomePage;
// src/App.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import App from './App';

describe('App Component', () => {
  test('renders home page by default', () => {
    render(<App />);
    const welcomeElement = screen.getByText(/Welcome to the Quiz App/i);
    expect(welcomeElement).toBeInTheDocument();
  });

  test('renders start quiz button', () => {
    render(<App />);
    const startButton = screen.getByRole('button', { name: /Start Quiz/i });
    expect(startButton).toBeInTheDocument();
  });

  test('navigates to quiz page when start button is clicked', () => {
    render(<App />);
    const startButton = screen.getByRole('button', { name: /Start Quiz/i });
    
    act(() => {
      fireEvent.click(startButton);
    });
    
    const quizTitle = screen.getByText(/Knowledge Quiz/i);
    expect(quizTitle).toBeInTheDocument();
  });

  test('displays questions on quiz page', () => {
    render(<App />);
    const startButton = screen.getByRole('button', { name: /Start Quiz/i });
    
    act(() => {
      fireEvent.click(startButton);
    });
    
    expect(screen.getByText(/What is the capital of Connecticut?/i)).toBeInTheDocument();
  });
});
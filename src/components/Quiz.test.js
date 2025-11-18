// src/components/Quiz.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import Quiz from './Quiz';

// Mock the alert function
global.alert = jest.fn();

describe('Quiz Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders quiz title', () => {
        render(<Quiz />);
        const titleElement = screen.getByText(/Knowledge Quiz/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('renders all questions', () => {
        render(<Quiz />);
        
        // Check if questions are rendered
        expect(screen.getByText(/What is the capital of Connecticut?/i)).toBeInTheDocument();
        expect(screen.getByText(/What is the square root of 16?/i)).toBeInTheDocument();
        expect(screen.getByText(/What type of number is 101?/i)).toBeInTheDocument();
    });

    test('renders all answer options', () => {
        render(<Quiz />);
        
        // Check first question answers
        expect(screen.getByText(/Stamford/i)).toBeInTheDocument();
        expect(screen.getByText(/Storrs/i)).toBeInTheDocument();
        expect(screen.getByText(/Hartford/i)).toBeInTheDocument();
    });

    test('submit button is disabled when no answers selected', () => {
        render(<Quiz />);
        
        const submitButton = screen.getByText(/Submit Quiz/i);
        expect(submitButton).toBeDisabled();
    });

    test('can select an answer', () => {
        render(<Quiz />);
        
        const radioInputs = screen.getAllByRole('radio');
        const firstAnswer = radioInputs[2]; // Hartford (correct answer)
        
        fireEvent.click(firstAnswer);
        
        expect(firstAnswer).toBeChecked();
    });

    test('submit button enabled after answering all questions', () => {
        render(<Quiz />);
        
        const radioInputs = screen.getAllByRole('radio');
        
        act(() => {
            // Answer question 1 (Hartford - index 2)
            fireEvent.click(radioInputs[2]);
            
            // Answer question 2 (4 - index 3)
            fireEvent.click(radioInputs[3]);
            
            // Answer question 3 (prime - index 6)
            fireEvent.click(radioInputs[6]);
        });
        
        const submitButton = screen.getByText(/Submit Quiz/i);
        expect(submitButton).not.toBeDisabled();
    });

    test('displays results after submission', async () => {
        render(<Quiz />);
        
        const radioInputs = screen.getAllByRole('radio');
        
        act(() => {
            // Answer all questions correctly
            fireEvent.click(radioInputs[2]); // Hartford
            fireEvent.click(radioInputs[3]); // 4
            fireEvent.click(radioInputs[6]); // prime
            
            const submitButton = screen.getByText(/Submit Quiz/i);
            fireEvent.click(submitButton);
        });
        
        await waitFor(() => {
            expect(screen.getByText(/Your Results/i)).toBeInTheDocument();
        });
    });

    test('shows try again button after submission', async () => {
        render(<Quiz />);
        
        const radioInputs = screen.getAllByRole('radio');
        
        act(() => {
            // Answer all questions
            fireEvent.click(radioInputs[2]);
            fireEvent.click(radioInputs[3]);
            fireEvent.click(radioInputs[6]);
            
            const submitButton = screen.getByText(/Submit Quiz/i);
            fireEvent.click(submitButton);
        });
        
        await waitFor(() => {
            expect(screen.getByText(/Try Again/i)).toBeInTheDocument();
        });
    });

    test('reset functionality works', async () => {
        render(<Quiz />);
        
        const radioInputs = screen.getAllByRole('radio');
        
        act(() => {
            // Answer all questions
            fireEvent.click(radioInputs[2]);
            fireEvent.click(radioInputs[3]);
            fireEvent.click(radioInputs[6]);
            
            const submitButton = screen.getByText(/Submit Quiz/i);
            fireEvent.click(submitButton);
        });
        
        await waitFor(() => {
            const tryAgainButton = screen.getByText(/Try Again/i);
            act(() => {
                fireEvent.click(tryAgainButton);
            });
        });
        
        // Check that results are cleared
        await waitFor(() => {
            expect(screen.queryByText(/Your Results/i)).not.toBeInTheDocument();
        });
        
        // Check that new submit button is present and disabled
        const newSubmitButton = screen.getByText(/Submit Quiz/i);
        expect(newSubmitButton).toBeDisabled();
    });

    test('shows correct answers after submission', async () => {
        render(<Quiz />);
        
        const radioInputs = screen.getAllByRole('radio');
        
        act(() => {
            // Answer all questions
            fireEvent.click(radioInputs[2]); // Correct: Hartford
            fireEvent.click(radioInputs[3]); // Correct: 4
            fireEvent.click(radioInputs[6]); // Correct: prime
            
            const submitButton = screen.getByText(/Submit Quiz/i);
            fireEvent.click(submitButton);
        });
        
        await waitFor(() => {
            // Check for checkmarks on correct answers
            const correctMarks = screen.getAllByText(/✓/);
            expect(correctMarks.length).toBeGreaterThan(0);
        });
    });

    test('cannot change answers after submission', async () => {
        render(<Quiz />);
        
        const radioInputs = screen.getAllByRole('radio');
        
        // Answer all questions
        fireEvent.click(radioInputs[2]);
        fireEvent.click(radioInputs[3]);
        fireEvent.click(radioInputs[6]);
        
        const submitButton = screen.getByText(/Submit Quiz/i);
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            // Try to click a different answer
            const newRadioInputs = screen.getAllByRole('radio');
            newRadioInputs.forEach(input => {
                expect(input).toBeDisabled();
            });
        });
    });
});
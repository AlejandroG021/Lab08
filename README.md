# Lab 8: React Quiz with Scoring 

## 📋 Overview
This project is an enhanced React quiz system with refactored scoring functionality, multiple pages, and comprehensive testing.

## 📁 Project Structure

```
src/
├── controllers/
│   ├── ScoreController.js          # Scoring business logic
│   └── ScoreController.test.js     # Unit tests
├── components/
│   ├── Quiz.js                     # Main quiz component
│   ├── Quiz.test.js                # Functional tests
│   ├── HomePage.js                 # Home page
│   └── ResultsPage.js              # Results page
├── model/
│   ├── basic_questions.json        # Quiz questions data
│   └── MyState.js                  # State management
├── App.js                          # Main app with navigation
├── App.css                         # Styling
└── QuizPageStyle.js                # Quiz-specific styles
```
## ⚙️ System Requirements

- Node.js 14+ 
- npm 6+
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Installation & Running

### Step 1: Extract the ZIP file
```bash
unzip lab8-quiz-system.zip
cd lab8-quiz-system
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Run the application
```bash
npm start
```

The application will open at `http://localhost:3000`

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

## 🧪 Testing Coverage

### ScoreController Unit Tests
- ✅ Perfect score calculation
- ✅ Partial score calculation
- ✅ Zero score calculation
- ✅ Empty answers handling
- ✅ Answer validation
- ✅ Feedback generation for all score ranges
- ✅ Score formatting

### Quiz Component Functional Tests
- ✅ Component rendering
- ✅ Question display
- ✅ Answer selection
- ✅ Submit button state management
- ✅ Results display
- ✅ Reset functionality
- ✅ Answer locking after submission
- ✅ Visual feedback


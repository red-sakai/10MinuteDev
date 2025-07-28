class QuizApp {
    constructor() {
        this.questions = [
            {
                question: "What does 'DOM' stand for?",
                answers: ["Document Object Model", "Data Object Management", "Dynamic Object Method", "Document Oriented Model"],
                correct: 0
            },
            {
                question: "Which method is used to add an element to the end of an array?",
                answers: ["append()", "push()", "add()", "insert()"],
                correct: 1
            },
            {
                question: "What is the correct way to declare a variable in JavaScript?",
                answers: ["variable myVar;", "var myVar;", "v myVar;", "declare myVar;"],
                correct: 1
            },
            {
                question: "Which operator is used for strict equality comparison?",
                answers: ["==", "===", "=", "!="],
                correct: 1
            },
            {
                question: "What will 'typeof null' return?",
                answers: ["null", "undefined", "object", "boolean"],
                correct: 2
            },
            {
                question: "Which method is used to remove the last element from an array?",
                answers: ["pop()", "remove()", "delete()", "splice()"],
                correct: 0
            },
            {
                question: "What is the correct way to write a JavaScript array?",
                answers: ["var colors = 'red', 'green', 'blue'", "var colors = (1:'red', 2:'green', 3:'blue')", "var colors = ['red', 'green', 'blue']", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')"],
                correct: 2
            },
            {
                question: "How do you create a function in JavaScript?",
                answers: ["function = myFunction() {}", "function myFunction() {}", "create myFunction() {}", "def myFunction() {}"],
                correct: 1
            }
        ];
        
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedAnswer = null;
        
        this.initializeElements();
        this.startQuiz();
    }
    
    initializeElements() {
        this.questionText = document.getElementById('questionText');
        this.answersContainer = document.getElementById('answersContainer');
        this.nextBtn = document.getElementById('nextBtn');
        this.scoreDisplay = document.getElementById('scoreDisplay');
        this.progressBar = document.getElementById('progressBar');
        this.questionContainer = document.getElementById('questionContainer');
        this.resultsContainer = document.getElementById('resultsContainer');
        this.finalScore = document.getElementById('finalScore');
        this.restartBtn = document.getElementById('restartBtn');
        
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
    }
    
    startQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.updateScore();
        this.updateProgress();
        this.showQuestion();
    }
    
    showQuestion() {
        const question = this.questions[this.currentQuestion];
        this.questionText.textContent = question.question;
        
        this.answersContainer.innerHTML = '';
        this.selectedAnswer = null;
        this.nextBtn.classList.add('hidden');
        
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = answer;
            button.addEventListener('click', () => this.selectAnswer(index, button));
            this.answersContainer.appendChild(button);
        });
    }
    
    selectAnswer(selectedIndex, buttonElement) {
        if (this.selectedAnswer !== null) return;
        
        this.selectedAnswer = selectedIndex;
        const question = this.questions[this.currentQuestion];
        const buttons = this.answersContainer.querySelectorAll('.answer-btn');
        
        buttons.forEach((btn, index) => {
            btn.disabled = true;
            if (index === question.correct) {
                btn.classList.add('correct');
            } else if (index === selectedIndex && index !== question.correct) {
                btn.classList.add('incorrect');
            }
        });
        
        if (selectedIndex === question.correct) {
            this.score++;
            this.updateScore();
        }
        
        this.nextBtn.classList.remove('hidden');
    }
    
    nextQuestion() {
        this.currentQuestion++;
        this.updateProgress();
        
        if (this.currentQuestion < this.questions.length) {
            this.showQuestion();
        } else {
            this.showResults();
        }
    }
    
    updateScore() {
        this.scoreDisplay.textContent = `Score: ${this.score}/${this.currentQuestion + 1}`;
    }
    
    updateProgress() {
        const progress = (this.currentQuestion / this.questions.length) * 100;
        this.progressBar.style.width = `${progress}%`;
    }
    
    showResults() {
        this.questionContainer.classList.add('hidden');
        this.nextBtn.classList.add('hidden');
        this.resultsContainer.classList.remove('hidden');
        
        const percentage = Math.round((this.score / this.questions.length) * 100);
        this.finalScore.textContent = `${this.score}/${this.questions.length} (${percentage}%)`;
        
        this.scoreDisplay.textContent = `Final Score: ${this.score}/${this.questions.length}`;
    }
    
    restartQuiz() {
        this.questionContainer.classList.remove('hidden');
        this.resultsContainer.classList.add('hidden');
        this.startQuiz();
    }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});

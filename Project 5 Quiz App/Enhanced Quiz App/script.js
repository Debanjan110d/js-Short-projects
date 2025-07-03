document.addEventListener('DOMContentLoaded', () => {

    const setupContainer = document.getElementById('setup-container')
    const startBtn = document.getElementById('start-btn')
    const quizContainer = document.getElementById('quiz-container')
    const questionContainer = document.getElementById('question-container')
    const choicesList = document.getElementById('choices-list')
    const nextBtn = document.getElementById('next-btn')
    const resultContainer = document.getElementById('result-container')
    const scoreNumber = document.getElementById('score-number')
    const totalScore = document.getElementById('total-score')
    const scoreMessage = document.getElementById('score-message')
    const restartBtn = document.getElementById('restart-btn')
    const questionCountSelect = document.getElementById('question-count')
    const currentQuestionSpan = document.getElementById('current-question')
    const totalQuestionsSpan = document.getElementById('total-questions')
    const progressFill = document.getElementById('progress-fill')

    let currentQuestionIndex = 0
    let score = 0
    let selectedChoice = null
    let totalQuestions = 5
    let selectedQuestions = []

    const questions = [
        {
            question: "What is the capital of France?",
            choices: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris",
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Mars", "Venus", "Jupiter", "Saturn"],
            answer: "Mars",
        },
        {
            question: "Who wrote 'Hamlet'?",
            choices: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Leo Tolstoy"],
            answer: "William Shakespeare",
        },
        {
            question: "What is the largest ocean on Earth?",
            choices: ["Atlantic", "Indian", "Pacific", "Arctic"],
            answer: "Pacific",
        },
        {
            question: "What is the boiling point of water?",
            choices: ["90°C", "100°C", "120°C", "80°C"],
            answer: "100°C",
        },
        {
            question: "Which gas do plants absorb from the atmosphere?",
            choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
            answer: "Carbon Dioxide",
        },
        {
            question: "Who painted the Mona Lisa?",
            choices: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
            answer: "Leonardo da Vinci",
        },
        {
            question: "Which country is known as the Land of the Rising Sun?",
            choices: ["China", "Japan", "Thailand", "South Korea"],
            answer: "Japan",
        },
        {
            question: "What is the chemical symbol for Gold?",
            choices: ["Au", "Ag", "Go", "Gd"],
            answer: "Au",
        },
        {
            question: "What is the square root of 64?",
            choices: ["6", "7", "8", "9"],
            answer: "8",
        },
        {
            question: "In which year did World War II end?",
            choices: ["1942", "1945", "1939", "1950"],
            answer: "1945",
        },
        {
            question: "Which is the smallest prime number?",
            choices: ["0", "1", "2", "3"],
            answer: "2",
        },
        {
            question: "What is the currency of the United Kingdom?",
            choices: ["Dollar", "Euro", "Pound Sterling", "Yen"],
            answer: "Pound Sterling",
        },
        {
            question: "Which language is primarily spoken in Brazil?",
            choices: ["Spanish", "Portuguese", "French", "English"],
            answer: "Portuguese",
        },
        {
            question: "What does DNA stand for?",
            choices: [
                "Deoxyribonucleic Acid",
                "Deoxyribose Nucleic Acid",
                "Dioxide Nitric Acid",
                "Double Helix Acid",
            ],
            answer: "Deoxyribonucleic Acid",
        },
        {
            question: "Which continent is the Sahara Desert located in?",
            choices: ["Asia", "South America", "Africa", "Australia"],
            answer: "Africa",
        },
        {
            question: "How many players are there in a football (soccer) team?",
            choices: ["9", "10", "11", "12"],
            answer: "11",
        },
        {
            question: "Which blood type is known as the universal donor?",
            choices: ["A", "B", "O-", "AB+"],
            answer: "O-",
        },
        {
            question: "Who developed the theory of relativity?",
            choices: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo Galilei"],
            answer: "Albert Einstein",
        },
        {
            question: "What is the capital city of Australia?",
            choices: ["Sydney", "Melbourne", "Canberra", "Perth"],
            answer: "Canberra",
        },
    ]

    startBtn.addEventListener('click', startQuiz)
    nextBtn.addEventListener('click', goToNextQuestion)
    restartBtn.addEventListener('click', restartQuiz)

    function startQuiz() {
        totalQuestions = parseInt(questionCountSelect.value)
        selectedQuestions = getRandomQuestions(totalQuestions)

        setupContainer.classList.add('hidden')
        resultContainer.classList.add('hidden')
        quizContainer.classList.remove('hidden')

        currentQuestionIndex = 0
        score = 0
        totalQuestionsSpan.textContent = totalQuestions

        renderQuestion()
    }

    function getRandomQuestions(count) {
        const shuffled = [...questions].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, count)
    }

    function renderQuestion() {
        nextBtn.classList.add('hidden')
        selectedChoice = null

        // Update progress
        currentQuestionSpan.textContent = currentQuestionIndex + 1
        const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100
        progressFill.style.width = `${progress}%`

        const currentQuestion = selectedQuestions[currentQuestionIndex]
        document.getElementById('question-text').textContent = currentQuestion.question
        choicesList.innerHTML = ''

        currentQuestion.choices.forEach(choice => {
            const choiceItem = document.createElement('li')
            choiceItem.textContent = choice
            choiceItem.classList.add('choice-item')
            choicesList.appendChild(choiceItem)

            choiceItem.addEventListener('click', () => {
                if (selectedChoice) return // Prevent multiple selections

                selectedChoice = choice

                // Show immediate feedback
                document.querySelectorAll('.choice-item').forEach(item => {
                    item.classList.add('disabled')
                    if (item.textContent === currentQuestion.answer) {
                        item.classList.add('correct')
                    } else if (item.textContent === choice) {
                        item.classList.add('wrong')
                    }
                })

                setTimeout(() => {
                    nextBtn.classList.remove('hidden')
                }, 1000)
            })
        })
    }

    function goToNextQuestion() {
        if (selectedChoice === selectedQuestions[currentQuestionIndex].answer) {
            score++
        }
        currentQuestionIndex++

        if (currentQuestionIndex < totalQuestions) {
            renderQuestion()
        } else {
            renderResult()
        }
    }

    function renderResult() {
        quizContainer.classList.add('hidden')
        resultContainer.classList.remove('hidden')

        scoreNumber.textContent = score
        totalScore.textContent = ` / ${totalQuestions}`

        const percentage = (score / totalQuestions) * 100

        if (percentage >= 80) {
            scoreMessage.textContent = "Excellent! You're a quiz master! 🎉"
            scoreMessage.className = "excellent"
        } else if (percentage >= 60) {
            scoreMessage.textContent = "Good job! Keep it up! 👍"
            scoreMessage.className = "good"
        } else {
            scoreMessage.textContent = "Keep practicing! You'll get better! 💪"
            scoreMessage.className = "needs-improvement"
        }
    }

    function restartQuiz() {
        currentQuestionIndex = 0
        score = 0
        selectedChoice = null
        setupContainer.classList.remove('hidden')
        resultContainer.classList.add('hidden')
        quizContainer.classList.add('hidden')
        progressFill.style.width = '0%'
    }

})

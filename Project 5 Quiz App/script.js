document.addEventListener('DOMContentLoaded', () => {

    const startBtn = document.getElementById('start-btn')
    const quizContainer = document.getElementById('quiz-container')
    const questionContainer = document.getElementById('question-container')
    const choicesList = document.getElementById('choices-list')
    const nextBtn = document.getElementById('next-btn')
    const resultContainer = document.getElementById('result-container')
    const scoreElement = document.getElementById('score')
    const restartBtn = document.getElementById('restart-btn')
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedChoice = null;

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
    ];

    startBtn.addEventListener('click', startQuiz)
    nextBtn.addEventListener('click', goToNextQuestion)
    restartBtn.addEventListener('click', restartQuiz)

    function startQuiz() {
        startBtn.classList.add('hidden')
        resultContainer.classList.add('hidden')
        quizContainer.classList.remove('hidden')
        currentQuestionIndex = 0
        score = 0
        renderQuestion()
    }

    function renderQuestion() {
        nextBtn.classList.add('hidden')
        selectedChoice = null
        document.getElementById('question-text').textContent = questions[currentQuestionIndex].question
        choicesList.innerHTML = ''//clear previous choices

        questions[currentQuestionIndex].choices.forEach(choice => {
            const choiceItem = document.createElement('li')
            choiceItem.textContent = choice
            choiceItem.classList.add('choice-item')
            choicesList.appendChild(choiceItem)

            choiceItem.addEventListener('click', () => {
                // Remove selection from all choices
                document.querySelectorAll('.choice-item').forEach(item => {
                    item.classList.remove('selected')
                })
                // Add selection to clicked choice
                choiceItem.classList.add('selected')
                selectedChoice = choice
                nextBtn.classList.remove('hidden')
            })
        })
    }

    function goToNextQuestion() {
        if (selectedChoice === questions[currentQuestionIndex].answer) {
            score++
        }
        currentQuestionIndex++

        if (currentQuestionIndex < questions.length) {
            renderQuestion()
        } else {
            renderResult()
        }
    }

    function renderResult() {
        quizContainer.classList.add('hidden')
        resultContainer.classList.remove('hidden')
        scoreElement.textContent = `You scored ${score} out of ${questions.length}`
    }

    function restartQuiz() {
        currentQuestionIndex = 0
        score = 0
        selectedChoice = null
        startBtn.classList.remove('hidden')
        resultContainer.classList.add('hidden')
        quizContainer.classList.add('hidden')
    }

})

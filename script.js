const startButton = document.querySelector(".button button")
const mainPage = document.querySelector("main .main-page")
const landingPage = document.querySelector("main .landing-page")
const scoreBoard = document.querySelector(".nav .score-board span")
const totalQue = document.querySelector("#questionNumber .total-que")



const questions = [
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which language is used to style web pages?",
        options: ["HTML", "Python", "CSS", "C++"],
        correctAnswer: "CSS"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["William Wordsworth", "William Shakespeare", "John Milton", "Charles Dickens"],
        correctAnswer: "William Shakespeare"
    },
    {
        question: "What does CPU stand for?",
        options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Performance Unit"],
        correctAnswer: "Central Processing Unit"
    },

    {
        question: "Which language is used to add functionality to a web pages?",
        options: ["HTML", "Python", "Java-Script", "C++"],
        correctAnswer: "Java-Script"
    }
];

let timerInterval; // interval reference
let timeLimit = 10; // har question ka 10 sec ka timer
const timeDisplay = document.querySelector(".nav #timer")
let timeout = document.querySelector(".timeout")

function startTimer() {
    let timeLeft = timeLimit;
    timeDisplay.innerText = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            mainPage.style.display = "none";
            timeout.style.display = "block";
            optionBox.forEach((btn) => {
                btn.style.pointerEvents = "none";
            });
            nextButton.click(); // Automatically go to next question

        }
    }, 1000);
}


document.querySelector(".okBtn").addEventListener("click", () => {
    location.reload();
    timeout.style.display = "none";
})

//Loading questions after opening of mainpage
let currentQuestionIndex = 0;
const questionBox = document.querySelector("#questionText");
const optionBox = document.querySelectorAll("#optionsContainer .optionBtn")


function loadQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    questionBox.innerText = currentQuestion.question;

    for (let i = 0; i < optionBox.length; i++) {
        optionBox[i].innerText = currentQuestion.options[i];
        optionBox[i].style.border = "none";
    }

    clearInterval(timerInterval);
    startTimer();

}
startButton.addEventListener("click", () => {
    landingPage.style.display = "none"
    mainPage.style.display = "block"
    loadQuestion();
   
})
totalQue.innerText = questions.length


//Changing questions and options on clicking next button...

const nextButton = document.querySelector(".nextButton button")
const number = document.querySelector("#questionNumber span")
let currentNumber = 1;
number.innerText = currentNumber;


nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    optionBox.forEach((btn) => {
        btn.style.pointerEvents = "auto";

    });
    loadQuestion();

    //Updating the number of questions
    currentNumber++;
    number.innerText = `${currentNumber}`
    totalQue.innerText = ` ${questions.length}`

    if (currentQuestionIndex === questions.length - 1) {
        nextButton.innerText = "Submit";
    } else {
        nextButton.innerText = "Next Question";
    }
})


//Choosing correct answers and increasing score....

let score = 0;
scoreBoard.innerText = score;

optionBox.forEach((element) => {
    element.addEventListener("click", () => {

        let correctAnswer = questions[currentQuestionIndex].correctAnswer;

        if (element.innerText === correctAnswer) {
            console.log("correct answer!!")
            element.style.border = "2px solid #35aa35"
            score = score + 3;
            scoreBoard.innerText = `${score}`;
        }
        else {
            console.log("wrong answer")
            element.style.border = "2px solid red"
            score--;
            scoreBoard.innerText = `${score}`;
        }

        optionBox.forEach((btn) => {
            btn.style.pointerEvents = "none";
        });
    })
})

// SUBMIT PAGE

const submit = document.querySelector(".SubmitPage")
const total = document.querySelector(".total-Score span");

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex === questions.length) {
        submit.style.display = "block"
        mainPage.style.display = "none";
        timeout.style.display = " none";

        total.innerText = `${score}`;
    }
})

const restart = document.querySelector(".restartBtn")
restart.addEventListener("click", () => {
    location.reload();
})




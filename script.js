const questions=[
    {
        question:'What is 2x2?',
        a:'3',
        b:'4',
        c:'8',
        d:'10',
        correct: 'b'
    },
    {
        question:'How old is Abdulelah',
        a:'20',
        b:'23',
        c:'22',
        d:'24',
        correct: 'c'
    },
    {
        question:'What is 5x2?',
        a:'10',
        b:'50',
        c:'22',
        d:'52',
        correct: 'a'
    },
    {
        question:'What is 12x2?',
        a:'10',
        b:'23',
        c:'22',
        d:'24',
        correct: 'd'
    },
]

// query the required elements
const questionContainter= document.querySelector('.question-container')
questionElement=questionContainter.querySelector('h2')
const choicesLabels= questionContainter.querySelectorAll('label')
const choicesInputs=questionContainter.querySelectorAll('input')
const choices= document.querySelector('.choices')
const btn= document.querySelector('button')

// quiz variables:
let question;
let currentQuestion=0;
let score=0;

// A function that clears the radio buttons, sets the question element with the proper question, and sets the labels with the corresponding choices.
function loadQuestion(){
    question= questions[currentQuestion]
    choicesInputs.forEach(choice =>{
        choice.checked=false
    })
    questionElement.innerText= question.question
    choicesLabels.forEach(choice =>{
        choice.innerText=question[choice.getAttribute('for')]
    })
}

// A function for handling the process of selecting answers. It will compare the checked answer's id with the correct choice. If matched, the score goes up by one.
function selectAnswer(){
    const correct= question.correct
    choicesInputs.forEach(choice=>{        
        if(choice.checked){
            if(choice.id==correct){
                score++;
            }
        }

    })
    
}

// A function for showing the score at the end. It will hide the choices and set the question with a proper message showing the score.
function showScore(){
    questionElement.innerText= `Your Score is ${score} out of ${questions.length}`
    choices.classList.add('hide')
}

// A function that resets quiz variables, and restart the quiz.
function restart(){
    score=0
    currentQuestion=0
    choices.classList.remove('hide')
    loadQuestion()
}




// We need to listen only to the event of clicking the button.
// This will be the flow of the program:
// The variable will be set to 0. The first question will be loaded. When the  `next` button is clicked, `currentQuestion` will be incremented. Then we will have 3 cases:
// 1. If `currentQuestion` < questions.length, then that means that there still questions left to be loaded. So, we process the choice selected, and load the next question.
// 2. If `currentQuestion` == questions.length, then that means that this is the last question. So, we process the choice selected and then show the score. We also change the text of the button to be more indicative: 'restart'.
// 3. If `currentQuestion` > questions.length, then that means that we already loaded all questions and showd the score. So, We need to restart the quiz. This is done by calling `restart` function.



btn.addEventListener('click', (e)=>{
    currentQuestion++
    if(currentQuestion>questions.length){
        restart()
    }
    else if(currentQuestion==questions.length){
        selectAnswer()
        showScore()
        e.target.innerText='Restart'
    }

    else{
        selectAnswer()
        loadQuestion()
    }

})

loadQuestion();

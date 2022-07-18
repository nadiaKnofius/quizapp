
let iamountOfQuestions = 1;
let questionCounter = 0;

function init(){
    let currentQuestion = fincOutCurrentQuestion();
    let question = getElmById('question-id');
    renderQuestionInHTML(question, currentQuestion); // question
    renderAnswers(); // answer
    let amountOfQuestions = getElmById('allquestions'); // footer
    amountOfQuestions.innerHTML = renderFooterOfCard();

}


function renderQuestionInHTML(question, currentQuestion){
    question.innerHTML = `${currentQuestion}`;
}


function fincOutCurrentQuestion(){
    return questions[questionCounter]['question'];
}


function renderAnswers(){
    for (let i = 1; i < 5; i++) {
        let whichanswer = [questions[questionCounter].answer_1, questions[questionCounter].answer_2, questions[questionCounter].answer_3, questions[questionCounter].answer_4]
        let answer = whichanswer[i - 1];
        let card = getElmById(`card${i}`);
        card.innerHTML = `
        <div class="answer-text" onclick="checkIfAnswerRight(${i}, 'card${i}')"> 
             ${answer}
        </div>
    `;
    }
}

function renderFooterOfCard(){
    return `
    Frage <b>${iamountOfQuestions}</b> von <b>${questions.length}</b>`;
}


function getElmById(id){
    return document.getElementById(id);
}

function checkIfAnswerRight(choseAnswer, id){
    document.getElementById('overlay-container').classList.remove('d-none');
    changeColorOfDiv = getElmById(id);
    let rightAnswer = questions[questionCounter].right_answer;
    if (choseAnswer == rightAnswer){
        changeColorOfDiv.parentNode.classList.add('bg-right');
    } else {
        changeColorOfDiv.parentNode.classList.add('bg-false');
        document.getElementById(`card${rightAnswer}`).parentNode.classList.add('bg-right');
    }
    document.getElementById('nextQuestion-btn').disabled = false;
}

function nextQuestion(){
    addAndRemoveClasses();
    iamountOfQuestions++;
    questionCounter++;
    init();
}

function addAndRemoveClasses(){
    document.getElementById('nextQuestion-btn').disabled = true;
    document.getElementById('overlay-container').classList.add('d-none');
    for (let i = 1; i < 5; i++) {
        document.getElementById(`card${i}`).parentNode.classList.remove('bg-right');
        document.getElementById(`card${i}`).parentNode.classList.remove('bg-false');
    }
}
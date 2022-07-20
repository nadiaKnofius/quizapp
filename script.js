
let iamountOfQuestions = 1;
let questionCounter = 0;
let rightAnswerCounter = 0;

let audio_wrong = new Audio('sounds/wrong.mp3');
let audio_correct = new Audio('sounds/correct.wav');
let audio_end = new Audio('sounds/end.wav');

function init(){
    let currentQuestion = fincOutCurrentQuestion();
    let question = getElmById('question-id');
    renderQuestionInHTML(question, currentQuestion); // question
    renderAnswers(); // answer
    renderFooterOfCard();
}


function fincOutCurrentQuestion(){
    return questions[questionCounter]['question'];
}


function renderQuestionInHTML(question, currentQuestion){
    question.innerHTML = `${currentQuestion}`;
}


function renderAnswers(){
    for (let i = 1; i < 5; i++) {
        let whichanswer = [questions[questionCounter].answer_1, questions[questionCounter].answer_2, questions[questionCounter].answer_3, questions[questionCounter].answer_4]
        let answer = whichanswer[i - 1];
        let card = getElmById(`card${i}`);
        card.innerHTML = `
        <div class="answer-text card-body" onclick="checkIfAnswerRight(${i}, 'card${i}')"> 
             ${answer}
        </div>
    `;
    }
}


function renderFooterOfCard(){
    let amountOfQuestions = getElmById('allquestions');
    amountOfQuestions.innerHTML = `
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
        rightAnswerCounter++;
        audio_correct.play();
    } else {
        changeColorOfDiv.parentNode.classList.add('bg-false');
        document.getElementById(`card${rightAnswer}`).parentNode.classList.add('bg-right');
        audio_wrong.play();
    }
    document.getElementById('nextQuestion-btn').disabled = false;
}

function nextQuestion(){
    addAndRemoveClasses();
    iamountOfQuestions++;
    questionCounter++;
    if(checkIfNextToLastQuestion(iamountOfQuestions)){
       document.getElementById('nextQuestion-btn').innerHTML = "Quiz abschließen"; 
       init();
    }else if(checkIfLastQuestion(iamountOfQuestions)){
        showQuizOver(); 
    } else {
        init();
    }
    calcProgressBar();
}

function addAndRemoveClasses(){
    document.getElementById('nextQuestion-btn').disabled = true;
    document.getElementById('overlay-container').classList.add('d-none');
    for (let i = 1; i < 5; i++) {
        document.getElementById(`card${i}`).parentNode.classList.remove('bg-right');
        document.getElementById(`card${i}`).parentNode.classList.remove('bg-false');
    }
}

function checkIfLastQuestion(iamountOfQuestions){
    if (iamountOfQuestions -1 == questions.length){
        return true;
    }else{
        return false;
    }
}

function checkIfNextToLastQuestion(iamountOfQuestions){
    if (iamountOfQuestions == questions.length){
        return true;
    }else{
        return false;
    }
}

function showQuizOver(){
    document.getElementById('question-id').innerHTML = 'Das Quiz ist beendet';
    document.getElementById('allquestions').innerHTML = `Du hast <b>${rightAnswerCounter}</b> von <b>${questions.length}</b> Fragen richtig beantwortet`;
    document.getElementById('nextQuestion-btn').classList.add('d-none');
    document.getElementById('play-again-btn').classList.remove('d-none');
    let overlay = document.getElementById('overlay-container');
    overlay.innerHTML = showQuizOverTemplate();
    overlay.classList.remove('d-none');
    overlay.classList.add('overlay-endofquiz');
    audio_end.play();
}

function showQuizOverTemplate(){
    return `
        <img src="img/trophy.jpg" alt="Bild einer Trophäe">
`;
}


// Progress bar
function calcProgressBar(){
    let questionsDone = iamountOfQuestions - 1;
    let result = (questionsDone * 100) / questions.length;
    result = parseInt(result);
    showUpdatedProgressBar(result);
}

function showUpdatedProgressBar(result){
    document.getElementById('progress-bar').innerHTML = `
    <div class="progress-bar progress-bar-striped" role="progressbar" style="width: ${result}%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"> ${result}%</div>
    `;
}


function playAgain(){
    iamountOfQuestions = 1;
    questionCounter = 0;
    rightAnswerCounter = 0;
    document.getElementById('play-again-btn').classList.add('d-none');
    document.getElementById('nextQuestion-btn').classList.remove('d-none');
    document.getElementById('nextQuestion-btn').innerHTML = "Nächste Frage";
    let overlay = document.getElementById('overlay-container');
    overlay.classList.add('d-none');
    overlay.classList.remove('overlay-endofquiz');
    overlay.innerHTML = '';
    init();
    calcProgressBar();
}
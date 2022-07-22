let iamountOfQuestions = 1;
let questionCounter = 0;
let rightAnswerCounter = 0;

let audio_wrong = new Audio('sounds/wrong.mp3');
let audio_correct = new Audio('sounds/correct.wav');
let audio_end = new Audio('sounds/end.wav');

function init(j){
    if(!j){
        j = 0;
    }
    let currentQuestion = fincOutCurrentQuestion(j);
    let question = getElmById('question-id');
    renderQuestionInHTML(question, currentQuestion);
    renderAnswers(j); 
    renderFooterOfCard(j); 
    createBtn(j);
}


function fincOutCurrentQuestion(j){
    return questions[j].quiz[questionCounter]['question'];
}


function renderQuestionInHTML(question, currentQuestion){
    question.innerHTML = `${currentQuestion}`;
}


function renderAnswers(j){
    for (let i = 1; i < 5; i++) {
        let whichanswer = [questions[j].quiz[questionCounter].answer_1, questions[j].quiz[questionCounter].answer_2, questions[j].quiz[questionCounter].answer_3, questions[j].quiz[questionCounter].answer_4];
        let answer = whichanswer[i - 1];
        let card = getElmById(`card${i}`);
        card.innerHTML = `
        <div class="answer-text card-body" onclick="checkIfAnswerRight(${i}, 'card${i}', ${j})"> 
             ${answer}
        </div>
    `;
    }
}


function renderFooterOfCard(j){
    let amountOfQuestions = getElmById('allquestions');
    amountOfQuestions.innerHTML = `
    Frage <b>${iamountOfQuestions}</b> von <b>${questions[j].quiz.length}</b>`;
}


function createBtn(j){
    document.getElementById('next-btn-container').innerHTML = `
    <button id="nextQuestion-btn" class="btn btn-primary" onclick="nextQuestion(${j})" disabled>Nächste Frage</button>
    <button id="play-again-btn" class="btn btn-primary d-none btn-play-again" onclick="playAgain(${j})">erneut spielen</button>
    `;
}


function getElmById(id){
    return document.getElementById(id);
}


function checkIfAnswerRight(choseAnswer, id, j){
    document.getElementById('overlay-container').classList.remove('d-none');
    changeColorOfDiv = getElmById(id);
    let rightAnswer = questions[j].quiz[questionCounter].right_answer;
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

function nextQuestion(j){
    addAndRemoveClasses();
    iamountOfQuestions++;
    questionCounter++;
    if(checkIfNextToLastQuestion(iamountOfQuestions, j)){
       document.getElementById('nextQuestion-btn').innerHTML = "Quiz abschließen"; 
       init(j);
    }else if(checkIfLastQuestion(iamountOfQuestions, j)){
        showQuizOver(j); 
    } else {
        init(j);
    }
    calcProgressBar(j);
}

function addAndRemoveClasses(){
    document.getElementById('nextQuestion-btn').disabled = true;
    document.getElementById('overlay-container').classList.add('d-none');
    for (let i = 1; i < 5; i++) {
        document.getElementById(`card${i}`).parentNode.classList.remove('bg-right');
        document.getElementById(`card${i}`).parentNode.classList.remove('bg-false');
    }
}

function checkIfLastQuestion(iamountOfQuestions, j){
    if (iamountOfQuestions -1 == questions[j].quiz.length){
        return true;
    }else{
        return false;
    }
}

function checkIfNextToLastQuestion(iamountOfQuestions, j){
    if (iamountOfQuestions == questions[j].quiz.length){
        return true;
    }else{
        return false;
    }
}


//shows endScreen
function showQuizOver(j){
    let overlay = document.getElementById('overlay-container');
    document.getElementById('question-id').innerHTML = 'Das Quiz ist beendet';
    document.getElementById('allquestions').innerHTML = `Du hast <b>${rightAnswerCounter}</b> von <b>${questions[j].quiz.length}</b> Fragen richtig beantwortet`;
    document.getElementById('nextQuestion-btn').classList.add('d-none');
    document.getElementById('play-again-btn').classList.remove('d-none');
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
function calcProgressBar(j){
    let questionsDone = iamountOfQuestions - 1;
    let result = (questionsDone * 100) / questions[j].quiz.length;
    result = parseInt(result);
    showUpdatedProgressBar(result);
}

function showUpdatedProgressBar(result){
    document.getElementById('progress-bar').innerHTML = `
    <div class="progress-bar progress-bar-striped" role="progressbar" style="width: ${result}%" 
    aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"> ${result}%</div>
    `;
}


function playAgain(j, id){
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
    init(j);
    calcProgressBar(j);
    changeBorder(id);
}


function changeBorder(id){
    id = document.getElementById(id);
    for (let i = 1; i < 4; i++) {
        let navId = document.getElementById(`nav${i}`);
        navId.classList.remove('border-orange');
        navId.classList.add('border-transparent');
    }
    id.classList.remove('border-transparent');
    id.classList.add('border-orange');

}
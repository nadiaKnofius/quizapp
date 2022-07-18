
let iamountOfQuestions = 1;
let questionCounter = 0;

function init(){
    let currentQuestion = fincOutCurrentQuestion();
    let question = getElmById('question-id');
    renderQuestionInHTML(question, currentQuestion); // question
    renderAnswers();
    let amountOfQuestions = getElmById('allquestions'); // footer
    amountOfQuestions.innerHTML = renderFooterOfCard();

}

function renderAnswers(){
    for (let i = 1; i < 5; i++) {
        let whichanswer = [questions[questionCounter].answer_1, questions[questionCounter].answer_2, questions[questionCounter].answer_3, questions[questionCounter].answer_4]
        let answer = whichanswer[i - 1];
        let card = getElmById(`card${i}`);
        card.innerHTML = `
        ${answer}
    `;
    }
}

function renderFooterOfCard(){
    return `
    Frage <b>${iamountOfQuestions}</b> von <b>${questions.length}</b>`;
}

function renderQuestionInHTML(question, currentQuestion){
    question.innerHTML = `${currentQuestion}`;
}

function fincOutCurrentQuestion(){
    return questions[questionCounter]['question'];
}


function getElmById(id){
    return document.getElementById(id);
}
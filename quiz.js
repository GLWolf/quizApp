let questionNumber = 0
let score = 0




function generateQuestion() {
    if (questionNumber < STORE.length) {
        return `
        <div class="question-${questionNumber} test">
        <form>
        <legend><h2>${STORE[questionNumber].question}</h2>
        </legend>
        <fieldset>
        <label class="answerChoices">
        <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
        <span>${STORE[questionNumber].answers[0]}</span>
        </label>
        <label class="answerChoices">
        <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
        <span>${STORE[questionNumber].answers[1]}</span>
        </label>
        <label class="answerChoices">
        <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
        <span>${STORE[questionNumber].answers[2]}</span>
        </label>
        <label class="answerChoices">
        <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
        <span>${STORE[questionNumber].answers[3]}</span>
        </label>
        <button id="button" type="submit" class="submitButton">Submit</button>
        </fieldset>
        </form>
        </div>`
    } else {
        renderResults()
        restartQuiz()
        $('.questionNumber').text(10)
    }
}

function changeQuestionNumber() {
    questionNumber++
    $('.questionNumber').text(questionNumber + 1)
}

function changeScore() {
    score++
}

function startQuiz() {
    $('.start').on('click', '.startButton', function (e) {
        $('.start').remove()
        $('.questionDisplay').css('display', 'block')
        $('.questionNumber').text(1)
    })
}

function renderQuestion() {
    $('.questionDisplay').html(generateQuestion())
}

function selectedAnswer() {
    $('form').on('submit', function (e) {
        e.preventDefault()
        let selected = $('input:checked')
        let answer = selected.val()
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`
        if (answer === correctAnswer) {
            selected.parent().addClass('correct')
            ifAnswerIsCorrect()
        } else {
            selected.parent().addClass('wrong')
            ifAnswerIsWrong()
        }
    })
}

function ifAnswerIsCorrect() {
    feedbackCorrect()
    updateScore()
}

function ifAnswerIsWrong() {
    feedbackWrong()
}

function feedbackCorrect() {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`
    $('.questionDisplay').html(`<div class="feedback"><div class="feedIcon"><img src="${STORE[questionNumber].icon}"
    alt="${STORE[questionNumber].alt}"/></div><p><b>Nice job you got it correct!!!!</b></p>
    <button class="audio" type="button" onclick="playTest()">play</button>
    <button class="audio" type="button" onclick="pauseTest()">pause</button>
    <audio id="bgm">
        <source src="${STORE[questionNumber].audioR}" type="audio/mpeg" />
    </audio>
    <button id="button" type=button
    class="nextButton">Next</button></div>`)
}

function feedbackWrong() {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`
    $('.questionDisplay').html(`<div class="feedback"><div class="feedIcon"><img src="${STORE[questionNumber].icon}"
    alt="${STORE[questionNumber].alt}"/></div><p><b>Sorry that is not correct,</b><br>the correct answer is <span>"${correctAnswer}"
    </span></p>
    <button class="audio" type="button" onclick="playTest()">play</button>
    <button class="audio" type="button" onclick="pauseTest()">pause</button>
    <audio id="bgm">
        <source src="${STORE[questionNumber].audioR}" type="audio/mpeg" />
    </audio>
    <button id="button" type=button class="nextButton">Next</button></div>`)
}

function updateScore() {
    changeScore()
    $('.score').text(score)
}

function renderResults() {
    if (score >= 9) {
        $('.questionDisplay').html(`<div class="results feedback"><h3>Nice work the ring has
        chosen you!</h3><img src="img/pick.jpg" alt="ring"/><p>You are ready for training report to Oa.</p><button
        id="button" class="restartButton">Restart Quiz</button></div`)
    } else {
        $('.questionDisplay').html(`<div class="results feedback"><h3>The ring has chosen someone else.</h3>
        <img src="img/search.jpg" alt="ring fly away"/><p>You need more work poozer.</p><button
        id="button" class="restartButton">Restart Quiz</button></div`)
    }
}

function renderNextQuestion() {
    $('main').on('click', '.nextButton', function (e) {
        changeQuestionNumber()
        renderQuestion()
        selectedAnswer()
    })
}

function restartQuiz() {
    $('main').on('click', '.restartButton', function (e) {
        location.reload()
    })
}


function playTest()
  {
  bgm.play();
  }
function pauseTest()
  {
  bgm.pause();
  } 



function createQuiz() {
    startQuiz()
    renderQuestion()
    selectedAnswer()
    renderNextQuestion()
}
$(createQuiz)



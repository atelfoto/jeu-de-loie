class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;

    }
    isCorrectAnswer(choise) {
        return this.answer === choise;

    }

}
let questions = [
    new Question("1. Sous qu’elle nom est née DAN-AR-BRAZ ?", ["Daniel Le Bras", "Alan Stivel", ""], "Daniel Le Bras"),
    new Question("2. En quelle année est né DAN-AR-BRAZ ?", ["1939", "1957", "1949"], "1957"),
    new Question("3. En quel année fut crée le festival de Cornouaille ?", ["1947", "1923", "1978"], "1923"),
    new Question("4. En quelle année a t’on fêté les 70 ans du bagad de quimper ?", ["2017", "2019", "2015"], "2019"),
    new Question("5. Combien de jours  dures le festival de Cornouaille ?", ["6 jours", "4 jours", "5 jours"], "6 jours"),
    new Question("6. Le festival  la vie en reuz 2021 se déroulera ou?", ["Concarneau", "Douarnenez", "Quimper"], "Douarnenez"),
    new Question("7. Depuis quelle année le festival la vie en reuz existe tel ?", ["2010", "2014", "2012"], "2012"),
    new Question("8. Quels sont les deux instruments principaux de la musique bretonne ?", ["Le Biniou", "La Cornemuse", "La Bombarde"], "Le Biniou"),
    new Question("9. Quel métier Philippe Poupon  né à Quimper fait-il ?", ["Plongeur", "Navigateur", ""], "Navigateur"),
    new Question("10. Quel  est le surnon de JEAN LE CAM ?", ["Le Roi Jean", "Le Dauphin", "Le Roi Richard"], "Le Roi Jean"),

];
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.currentQuestionIndex = 0;
    }
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    guess(answer) {
        if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.currentQuestionIndex++;
    }
    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}
// regroup all functions relative to the app display
const display = {
    elementShown: function(id, text) {
        let element = document.getElementById(id);
        element.innerHTML = text;
    },
    endQuiz: function() {
        let endQuizHTML = `
        <h1>Quiz terminé !</h1>
        <h3>Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>
        <a href="./culinaire.html">Quiz suivant Culinaire en bretagne</a>`;
        this.elementShown('quiz', endQuizHTML);
    },
    question: function() {
        this.elementShown("question", quiz.getCurrentQuestion().text);
    },
    choices: function() {
        let choices = quiz.getCurrentQuestion().choices;

        guessHandler = (id, guess) => {
            document.getElementById(id).onclick = function() {
                quiz.guess(guess);
                quizApp();
            }
        }
        for (let i = 0; i < choices.length; i++) {
            this.elementShown("choice" + i, choices[i]);
            guessHandler("guess" + i, choices[i]);
        }
    },
    progress: function() {
        let currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    }

}

// game logic
quizApp = () => {
    if (quiz.hasEnded()) {
        display.endQuiz();
    } else {
        display.question();
        display.choices();
        display.progress();
    }
}

//create quiz
let quiz = new Quiz(questions);
quizApp();
console.log(quiz);
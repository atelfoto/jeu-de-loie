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
    new Question("1. Sous quel nom est né DAN-AR-BRAZ ?", ["Daniel Le Bras", "Alan Stivel", "Pierre Le Gloan"], "Daniel Le Bras"),
    new Question("2. En quelle année est né DAN-AR-BRAZ ?", ["1939", "1957", "1949"], "1957"),
    new Question("3. En quelle année fut créé le festival de Cornouaille ?", ["1947", "1923", "1978"], "1923"),
    new Question("4. En quelle année a t’on fêté les 70 ans du bagad de Quimper ?", ["2017", "2019", "2015"], "2019"),
    new Question("5. Combien de jours dure le festival de Cornouaille ?", ["6 jours", "4 jours", "5 jours"], "6 jours"),
    new Question("6. Où se déroulera le festival La vie en Reuz en 2021 ?", ["Concarneau", "Douarnenez", "Quimper"], "Douarnenez"),
    new Question("7. Depuis quelle année le festival \"La vie en reuz\" existe t'il?", ["2010", "2014", "2012"], "2012"),
    new Question("8. Quel est l'instrument principal de la musique bretonne ?", ["Le Biniou", "La Cornemuse", "La Bombarde"], "Le Biniou"),
<<<<<<< HEAD
    // new Question("8. Quels sont les deux instruments principaux de la musique bretonne ?", ["Le Biniou", "La Cornemuse", "La Bombarde"], "Le Biniou"),
=======
>>>>>>> 63f61342ef1cdd3bbd22ef0de6dbe0af9c09e5b5
    new Question("9. Quel métier Philippe Poupon  né à Quimper exerce t-il ?", ["Plongeur", "Navigateur", "Politique"], "Navigateur"),
    new Question("10. Quel  est le surnom de JEAN LE CAM ?", ["Le Roi Jean", "Le Dauphin", "Le Roi Richard"], "Le Roi Jean"),

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
        <h1><span>Q</span>uizz terminé !</h1>
        <h3>Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>
        <a class="next" href="./culinaire.html">Clic içi pour le Quiz suivant</a>
        <h3 class="reply">Les Bonnes Réponses</h3>
        <ol class="resultat">
        <li><span>Daniel Le Bras</span>, Alan Stivel, Pierre Le Gloan</li>
        <li>1939, <span>1957</span>, 1949</li>
        <li>1947, <span>1923</span>, 1978</li>
        <li>2017, <span>2019</span>, 2015</li>
        <li><span>6 jours</span>, 4 jours, 5 jours</li>
        <li>Concarneau, <span>Douarnenez</span>, Quimper</li>
        <li>2010, 2014, <span>2012</span></li>
        <li><span>Le Biniou</span>, La Cornemuse, La Bombarde</li>
        <li>Plongeur, <span>Navigateur</span>, Politique</li>
        <li><span>Le Roi Jean</span>, Le Dauphin, Le Roi Richard</li>
        </ol>`;
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
//menu
$('a.hide-sidebar-toggle').click(function() {
    $('.sidebar').toggleClass('hide-sidebar');
});
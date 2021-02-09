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
    new Question("1. Quelle est la superficie du jardin du Prieuré de Locmaria ?", ["3 200 M²", "1 700 M²", "10 000 M²"], "1 700 M²"),
    new Question("2. Où se situe le château de Keriolet ?", ["Quimper", "Concarneau", "Bénodet"], "Concarneau"),
    new Question("3. En agriculture, que représente la majorité de la production Cornouaillaise ?", ["Le porc", "La viande bovine", "Les Végétaux"], "Les Végétaux"),
    new Question("4. En quelle année les chambres d’agricultures sont-elles apparues ?", ["1880", "1924", "2006"], "1924"),
    new Question("5. Les agriculteurs bretons nourrissent :", ["12 millions de personnes", "22 millions de personnes", "32 millions de personnes"], "22 millions de personnes"),
    new Question("6. Quel grand fabricant de charcuterie de la Cornouaille est réputé en France pour son pâté ?", ["Herta", "Wagner", "Hénaff"], "Hénaff"),
    new Question("7. Quelle est la superficie du parc naturel régional d'Armorique ?", ["125 000 hectares", "268 000 hectares", "79 500 hectares"], "125 000 hectares"),
    new Question("8. L'Archipel des Glénan est un archipel de 9 îles ?", ["Vrai", "Faux", null], "Vrai"),
    new Question("9. Combien de touristes viennent en Pays de Cornouaille chaque année ?", ["6.5 millions", "1.6 millions", "2.3 millions"], "2.3 millions"),
    new Question("10. Le plus grand parc d’algues d’Europe se trouve en Finistère :", ["Vrai", "Faux", null], "Vrai"),


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
        <h3 class="reply">Les Bonnes Réponses</h3>
        <ol class="resultat">
        <li>3 200 M², <span>1 700 M²</span>, 10 000 M²</li>
        <li>Quimper, <span>Concarneau</span>, Bénodet</li>
        <li>Le porc, La viande bovine, <span>Les Végétaux</span></li>
        <li>1880, <span>1924</span>, 2006</li>
<<<<<<< HEAD:quiz/js/option.js
<<<<<<< HEAD
        <li>12 millions de personnes, <span>22 millions de personnes</span>, 32millions de personnes</li>
=======
        <li>12 millions de personnes, <span>22 millions de personnes</span>, 32millions de personnes</li>
>>>>>>> 63f61342ef1cdd3bbd22ef0de6dbe0af9c09e5b5
=======
        <li>12 millions de personnes, <span>22 millions de personnes</span>, 32 millions de personnes</li>
>>>>>>> b315e4981795c9fdd0f9e8dff3dfea42324ff779:quiz/js/bonus.js
        <li><span>Herta</span>, Wagner, Henaff</li>
        <li><span>125 000 hectares</span>, 268 000 hectares, 79 500 hectares</li>
        <li><span>Vrai</span>, Faux</li>
        <li>6.5 millions, 1.6 millions, <span>2.3 millions</span></li>
        <li><span>Vrai</span>, Faux</li>
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
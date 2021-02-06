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
// revoir la question 3 erreur dans la réponse
let questions = [
    new Question("1: Quel artisan a inventé le bol prénom à oreilles ?", ["Alan Stivel", "Henriot", "Erwan Berthou"], "Henriot"),
    new Question("2: Quand a été créée la faïencerie  Henriot à Quimper ?", ["1490", "1690", "1790"], "1690"),
    new Question("3. Quelle est la date d’invention de la crêpe dentelle ?", ["1886", "2006", "1906"], "1886"),
    new Question("4. Le crêpe dentelle est une crêpe bretonne très fine, roulée sur elle-même et croustillante :", ["Vrai ", "Faux", null], "Vrai "),
    new Question("5. Quel est l’ingrédient principal d’une crêpe dentelle ?", ["Du beurre", "Du chocolat", "Du Lait"], "Du beurre"),
    new Question("6. La crêpe complète est composée d’un œuf, de jambon et de fromage :", ["Vrai", "Faux", null], "Vrai"),
    new Question("7. Quelle est la spécialité de Pascal Jaouen ?", ["La Broderie d'art", "La cuisine", "Artisan Boulanger"], "La Broderie d'art"),
    new Question("8. Où se trouve l’école de broderie d’art de Pascal Jaouen ?", ["Pont l'abbé", "Quimper", "Brest"], "Quimper"),
    new Question("9. Quel est l’ingrédient principal du cidre breton ?", ["Poire", "Pomme", "Mais"], "Pomme"),
    new Question("10. Le cidre Kerné est élaboré à Pouldreuzic :", ["Vrai", "Faux", null], "Vrai"),
    new Question("11. Que signifie « Kouign Amann » ?", ["Gâteau au beurre", "Crêpe au beurre", "Crêpe au sucre"], "Gâteau au beurre"),
    new Question("12. Le « Kouign amann » est une spécialité de Douarnenez :", ["Vrai", "Faux", null], "Vrai"),
    new Question("13. Quelle est la spécialité de Locronan ?", ["La peinture sur toile", "La verrerie", "La Ferronnerie"], "La verrerie"),


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
        <a class="next" href="./culinaire.html">Quiz suivant</a>
        <h3 class="reply">Les Bonnes Réponses</h3>
        <ol class="resultat">
        <li>Alan Stivel, <span>Henriot</span>, Erwan Berthou</li>
        <li>1490, <span>1690</span>, 1790</li>
        <li><span>1896</span>, 2006, 1906</li>
        <li><span>Vrai</span> , Faux</li>
        <li><span>Du beurre</span> , Du chocolat, Du Lait</li>
        <li><span>Vrai</span>, Faux</li>
        <li><span>La Broderie d'art</span>, La cuisine, Artisan Boulanger</li>
        <li>Pont l'abbé, <span>Quimper</span>, Brest</li>
        <li>Poire , <span>Pomme</span>, Mais</li>
        <li><span>Vrai</span>, Faux</li>
        <li><span>Gâteau au beurre</span>, Crêpe au beurre, Crêpe au sucre</li>
        <li><span>Vrai</span>, Faux</li>
        <li>La peinture sur toile, <span>La verrerie</span>, La Ferronnerie</li>
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
// menu
$('a.hide-sidebar-toggle').click(function() {
    $('.sidebar').toggleClass('hide-sidebar');
});
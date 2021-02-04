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
    new Question("1: Quel gâteau est originaire de Douarnenez?", ["Le quatre-quarts", "le kouign-amann", "le gâteau aux yaourt"], "le kouign-amann"),
    new Question("2. Comment est appelé l’appareil pour faire des crêpes/ galettes?", ["Une billig", "Un four", "Une poêle"], "Une billig, "),
    new Question("3. Quelle est la crêpe la plus connue ?", ["Complète ", "Lancelot", "Perceval"], "Complète "),
    new Question("4. Avec quel fruit sec est préparé le far ?", ["Les pruneaux", "les raisins", "les cerises"], "Les pruneaux"),
    new Question("5. Pour quel fruit est connu la charmante ville de Plougastel ?", ["Framboises", "Pommes", "Fraises"], "Fraises"),
    new Question("6. Quel est le caramel breton le plus connu pour garnir vos crêpes ?", ["Aux beurre doux", "Aux beurre salé", "Aux sucre roux"], "Aux beurre salé"),
    new Question("7. Le lait ribot peut être bu comme du lait normal ou bien dans un bol avec une galette dedans.Mais qu’est ce que c’est réellement?", ["Du lait fermenté", "Du lait de chèvre", "Du lait de truie"], "Du lait fermenté"),
    new Question("8. A partir de quel jus de fruit est fabriqué le pommeau?", ["Orange", "Cerise", "Pomme"], "Pomme"),
    new Question("9. Quel est l’autre nom du lait ribot ?", ["Lactosérum", "Babeurre", "Petit lait"], "Babeurre"),
    new Question("10. Qui sont les Jhonnies ?", ["Des producteurs d’oignons", "Des membres du fan-club breton de Johnny Hallyday", "Des éleveurs de porc de la race John Bent"], "Des producteurs d’oignons"),
    new Question("11. Avec quoi est fabriqué le chouchen ?", ["Caramel au beurre salé", "Jus de chaussette", "Miel fermenté"], "Miel fermenté"),

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
        <a class="next" href="./artisanal.html">Quizz suivant</a>
        <h3 class="reply">Les Bonnes Réponses</h3>
        <ol class="resultat">
        <li><span>le kouign-amann</span>, le gâteau aux yaourt</li>
        <li><span>Une billig</span>, Un four, Une poêle</li>
        <li><span>Complète</span> , Lancelot, Perceval</li>
        <li><span>Les pruneaux</span>, les raisins, les cerises</li>
        <li>Framboises, Pommes, <span>Fraises</span></li>
        <li>Aux beurre doux, <span>Aux beurre salé</span>, Aux sucre roux</li>
        <li><span>Du lait fermenté</span>, Du lait de chèvre, Du lait de truie</li>
        <li>Orange, Cerise, <span>Pomme</span></li>
        <li>Lactosérum, <span>Babeurre</span>, Petit lait</li>
        <li><span>Des producteurs d’oignons</span>, Des membres du fan-club breton de Johnny Hallyday, Des éleveurs de porc de la race John Bent</li>
        <li>Caramel au beurre salé, Jus de chaussette, <span>Miel fermenté</span></li>`;
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

$('a.hide-sidebar-toggle').click(function() {
    $('.sidebar').toggleClass('hide-sidebar');
});
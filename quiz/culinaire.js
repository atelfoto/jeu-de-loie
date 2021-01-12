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
    new Question("1: La gallette de sarrasin se mange salée, la crepe de froment sucrée?", ["Vrai", "Faux", null], "Vrai"),
    new Question("2: Quel gâteau est originaire de Douarnenez?", ["Le quatre-quarts", "le kouign-amann", "le gâteau aux yaourt"], "le kouign-amann"),
    new Question("3. Comment est appelé l’appareil pour faire des crêpes/ galettes?", ["Un bilig", "Un four", "Une poêle"], "Un bilig, "),
    new Question("4. Pour la galette, de nombreuses recette existe pour la garnir mais une est plus connue que les autres, c'est la: ", ["Complète ", "Lancelot", "Perceval"], "Complète "),
    new Question("5. De petit biscuit sec en pâte sablée, qui contient en moyenne 20% de beurre demi-sel, comment s’appel t’il?", ["Les échecs bretons", "Les palets bretons", "Les disques bretons"], "Les palets bretons"),
    new Question("6. : Le far, un autre dessert régional, est généralement fabriqué avec un fruit sec, et c’est", ["Les pruneaux", "les raisins", "les cerises"], "Les pruneaux"),
    new Question("7. Plougastel, charmante petite ville du Finistère très connue pour ses:", ["Framboises", "Pommes", "Fraises"], "Fraises"),
    new Question("8. Si vous voulez garnir vos crêpes, voici la sauce indispensable, le caramel , mais pas n’importe le quel, celui", ["Aux beurre doux", "Aux beurre salé", "Aux sucre roux"], "Aux beurre salé"),
    new Question("9. Le lait ribot peut être bu comme du lait normal ou bien dans un bol avec une galette dedans.Mais qu’est ce que c’est réellement?", ["Du lait fermenté", "Du lait de chèvre", "Du lait de truie"], "Du lait fermenté"),
    new Question("10. Le pommeau, est un alcool d’origine cretonne. Avec quel jus de fruit est-il fabriqué?", ["Orange", "Cerise", "Pomme"], "Pomme"),
    new Question("11. Une des plus anciennes boissons du monde s’appel le chouchen, il est aussi fabriqué avec de la pomme, mais aussi de", ["Caramel au beurre salé", "Jus de chaussette", "Miel fermenté"], "Miel fermenté"),
    new Question("12. Quel est l’autre nom du lait ribot?", ["Lactosérum", "Babeurre", "Petit lait"], "Babeurre"),
    new Question("13. Qui sont les Jhonnies?", ["Des producteurs d’oignons", "Des membres du fan-club breton de Johnny Hallyday", "Des éleveurs de porc de la race John Bent"], "Des producteurs d’oignons"),

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
        <h3>Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
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
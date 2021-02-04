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
    new Question("1. En quelle année fut créé le festival de Cornouaille ?", ["1947", "1923", "1958"], "1923"),
    new Question("2. Quel pourcentage représente la filière agroalimentaire par rapport à l’ensemble des emplois industriels de l’agglomération Cornouaillaise ?", ["50%", "30%", "60%"], "50%"),
    new Question("3. Quel évènement se déroule chaque été à Concarneau ?", ["Les vieilles charrues", "Les filets bleus", "Le festival de Cornouaille"], "Les filets bleus"),
    new Question("4. La Cornouaille est bordée par 451km de côtes.", ["Vrai", "Faux", null], "Vrai"),
    new Question("5. Quelle est la préfecture du Finistère ?", ["Quimper", "Brest", "Concarneau"], "Quimper"),
    new Question("6. Quel est le surnom du port de pêche du Guilvinec ?", ["Penn sardines", "Petite mer", "Coeur de la pêche"], "Coeur de la pêche"),
    new Question("7. Quel est le premier port de pêche français artisanal ?", ["Port de Concarneau", "Port de Douarnenez", "Port de Guilvinec"], "Port de Guilvinec"),
    new Question("8. Quelle a été la durée de construction du phare d’Eckmühl ?", ["2 ans", "4 ans", "6 ans"], "4 ans"),
    new Question("9. A quelle hauteur culminent les flèches de la cathédrale Saint-Corentin de Quimper ?", ["69 mètres", "72 mètres", "75 mètres"], "75 mètres"),

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
        <a class="next" href="./option.html">Quiz suivant</a>
        <h3 class="reply">Les Bonnes Réponses</h3>
        <ol class="resultat">
        <li>1947, <span>1923</span>, 1958</li>
        <li><span>50%</span> 30%, 60%</li>
        <li>Les vieilles charrues, <span>Les filets bleus</span>, Le festival de Cornouaille</li>
        <li><span>Vrai</span>, Faux</li>
        <li><span>Quimper</span>, Brest, Concarneau</li>
        <li>Penn sardines, Petite mer, <span>Coeur de la pêche</span></li>
        <li>Port de Concarneau, Port de Douarnenez, <span>Port de Guilvinec</span></li>
        <li>2 ans, <span>4 ans</span>, 6 ans</li>
        <li>69 mètres, 72 mètres, <span>75 mètres</span></li>
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
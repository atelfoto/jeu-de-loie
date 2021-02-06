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
    new Question("2. Quel évènement se déroule chaque été à Concarneau ?", ["Les vieilles charrues", "Les filets bleus", "Le festival de Cornouaille"], "Les filets bleus"),
    new Question("3. La Cornouaille est bordée par 451km de côtes :", ["Vrai", "Faux", null], "Vrai"),
    new Question("4. Quelle est la préfecture du Finistère ?", ["Quimper", "Brest", "Concarneau"], "Quimper"),
    new Question("5. Quel est le surnom du port de pêche du Guilvinec ?", ["Penn sardines", "Petite mer", "Coeur de la pêche"], "Coeur de la pêche"),
    new Question("6. Quel est le premier port de pêche français artisanal ?", ["Port de Concarneau", "Port de Douarnenez", "Port de Guilvinec"], "Port de Guilvinec"),
    new Question("7. Quelle a été la durée de construction du phare d’Eckmühl ?", ["2 ans", "4 ans", "6 ans"], "4 ans"),
    new Question("8. A quelle hauteur culminent les flèches de la cathédrale Saint-Corentin de Quimper ?", ["69 mètres", "72 mètres", "75 mètres"], "75 mètres"),
    new Question("9. Sous quel nom est né DAN-AR-BRAZ ?", ["Daniel Le Bras", "Alan Stivel", "Pierre Le Gloan"], "Daniel Le Bras"),
    new Question("10. En quelle année est né DAN-AR-BRAZ ?", ["1939", "1957", "1949"], "1957"),
    new Question("11. En quelle année a t’on fêté les 70 ans du bagad de Quimper ?", ["2017", "2019", "2015"], "2019"),
    new Question("12. Combien de jours dure le festival de Cornouaille ?", ["6 jours", "4 jours", "5 jours"], "6 jours"),
    new Question("13. Où se déroulera le festival La vie en Reuz en 2021 ?", ["Concarneau", "Douarnenez", "Quimper"], "Douarnenez"),
    new Question("14. Depuis quelle année le festival \"La vie en reuz\" existe t'il ?", ["2010", "2014", "2012"], "2012"),
    new Question("15. Quel est l'instrument principal de la musique bretonne ?", ["Le Biniou", "La Cornemuse", "La Bombarde"], "Le Biniou"),
    new Question("16. Quel métier Philippe Poupon  né à Quimper exerce t-il ?", ["Plongeur", "Navigateur", "Politique"], "Navigateur"),
    new Question("17. Quel est le surnom de JEAN LE CAM ?", ["Le Roi Jean", "Le Dauphin", "Le Roi Richard"], "Le Roi Jean"),
    new Question("18. Qui sont les Jhonnies ?", ["Des producteurs d’oignons", "Des membres du fan-club breton de Johnny Hallyday", "Des éleveurs de porc de la race John Bent"], "Des producteurs d’oignons"),
    new Question("19. La ville de Locronan est connue pour ses illuminations durant la période de Noel :", ["Vrai", "Faux", null], "Vrai"),
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
        <a class="next" href="./peche.html">Quiz suivant</a>
        <h3 class="reply">Les Bonnes Réponses</h3>
        <ol class="resultat">
        <li>1947, <span>1923</span>, 1958</li>
        <li>Les vieilles charrues, <span>Les filets bleus</span>, Le festival de Cornouaille</li>
        <li><span>Vrai</span>, Faux</li>
        <li><span>Quimper</span>, Brest, Concarneau</li>
        <li>Penn sardines, Petite mer, <span>Coeur de la pêche</span></li>
        <li>Port de Concarneau, Port de Douarnenez, <span>Port de Guilvinec</span></li>
        <li>2 ans, <span>4 ans</span>, 6 ans</li>
        <li>69 mètres, 72 mètres, <span>75 mètres</span></li>
        <li><span>Daniel Le Bras</span>, Alan Stivel, Pierre Le Gloan</li>
        <li>1939, <span>1957</span>, 1949</li>
        <li>2017, <span>2019</span>, 2015</li>
        <li><span>6 jours</span>, 4 jours, 5 jours</li>
        <li>Concarneau, <span>Douarnenez</span>, Quimper</li>
        <li>2010, 2014, <span>2012</span></li>
        <li><span>Le Biniou</span>, La Cornemuse, La Bombarde</li>
        <li>Plongeur, <span>Navigateur</span>, Politique</li>
        <li><span>Le Roi Jean</span>, Le Dauphin, Le Roi Richard</li>
        <li><span>Des producteurs d’oignons</span>, Des membres du fan-club breton de Johnny Hallyday, Des éleveurs de porc de la race John Bent</li>
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
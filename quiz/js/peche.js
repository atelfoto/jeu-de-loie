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
    new Question("1: Combien y a-t-il de navires qui pêchent dans les eaux de la Bretagne ?", ["354", "543", "435"], "354"),
    new Question("2: Combien de tonnes de poissons sont débarquées par mois ?", ["49 236 tonnes", "53 236 tonnes", "58 236 tonnes"], "53 236 tonnes"),
    new Question("3: Combien de millions d’euros rapporte l’ensemble de la pêche Cornouaillaise en 2019 ?", ["140,9 millions", "120 millions", "130,9 millions"], "140,9 millions"),
    new Question("4: Combien y a-t-il d’emplois dans le mareyage ?", ["500 emplois", "780 emplois", "850 emplois"], "780 emplois"),
    new Question("5: Combien y a-t-il d’employés qui dépendent directement de la filière pêche ?", ["5 000", "5 500", "6 000"], "5 500"),
    new Question("6: Combien d'achats issus de la pêche bretonne sont réalisés par des locaux ?", ["91%", "85%", "80%"], "91%"),
    new Question("7: Quelle est la place de la pêche fraÎche en France ?", ["1er", "2eme", "3eme"], "1er"),
    new Question("8: Quel pourcentage représente la pêche fraîche française ?", ["25%", "30%", "35%"], "25%"),
    new Question("9: Quel pourcentage représente la pêche fraîche bretonne ?", ["40%", "50%", "60%"], "50%"),
    new Question("10. Combien de navires ont été construits par l’entreprise Piriou ?", ["250", "500", "350"], "500"),
    new Question("11. Quel âge a l’entreprise Piriou ?", ["70 ans", "55 ans", "60 ans"], "55 ans"),
    new Question("12. L’entreprise Piriou est basée à Concarneau :", ["Vrai", "Faux", null], "Vrai"),
    new Question("13. Quelle est la principale ville de Cornouaille au niveau de l’industrie navale ?", ["Bénodet", "Concarneau", "Quimper"], "Concarneau"),
    new Question("14. Combien de salariés compte l’entreprise Monique Ranou basée à Quimper ?", ["315", "337", "513"], "513"),
    new Question("15. Quel âge a Monique Ranou ?", ["Plus de 80 années", "Plus de 110 années", "Plus de 90 années"], "Plus de 110 années"),
    new Question("16. Quel est le premier groupe agroalimentaire de Quimper Cornouaille ?", ["Meralliance", "Bigard", "Entremont"], "Bigard"),
    new Question("17. Quel pourcentage représente la filière agroalimentaire par rapport à l’ensemble des emplois industriels de l’agglomération Cornouaillaise ?", ["50%", "30%", "60%"], "50%"),


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
        <a class="next far" href="./bonus.html">Quiz suivant</a>
        <h3 class="reply">Les Bonnes Réponses</h3>
        <ol class="resultat">
        <li><span>354</span>, 543, 435</li>
        <li>49 236 tonnes, <span>53 236 tonnes</span>, 58 236 tonnes</li>
        <li><span>140,9 millions</span>, 120 millions, 130,9 millions</li>
        <li>500 emplois, <span>780 emplois</span>, 850 emplois</li>
        <li>5 000, <span>5 500</span>, 6 000</li>
        <li><span>91%</span>, 85%, 80%</li>
        <li><span>1er</span>, 2eme, 3eme</li>
        <li><span>25%</span>, 30%, 35%</li>
        <li>40%, <span>50%</span>, 60%</li>
        <li>250, <span>500</span>, 350</li>
        <li>70 ans, <span>55 ans</span>, 60 ans</li>
        <li><span>Vrai</span>, Faux</li>
        <li>Bénodet, <span>Concarneau</span>, Quimper</li>
        <li>315, 337, <span>513</span></li>
        <li>Plus de 80 années, <span>Plus de 110 années</span></li>
        <li>Meralliance, <span>Bigard</span>, Entremont</li>
        <li><span>50%</span> 30%, 60%</li>
        </ol>
        `;
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
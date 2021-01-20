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
    new Question("1: Combien y a-t-il de navire qui pêche dans les eaux de la bretagne ?", ["354", "543", "435"], "354"),
    new Question("2: Combien de tonne de poisson sont débarqué par mois ?", ["49236", "53236", "58236"], "53236"),
    new Question("3: Combien de millions d’euros rapporte l’ensemble de la pêche cornouaillaise en 2019 ?", ["140,9 millions", "120 millions", "130,9 millions"], "140,9 millions"),
    new Question("4: Combien d’emploi dans le mareyage ?", ["500 emplois", "780 emplois", "850 emplois"], "780 emplois"),
    new Question("5: Combien d’employé dépendant directement de la filière pêche ?", ["5000", "5500", "6000"], "5500"),
    new Question("6: Combien des achats réalisés par des locaux ?", ["91%", "85%", "80%"], "91%"),
    new Question("7: Quel place de pêche fraiche en France ?", ["1er", "2eme", "3eme"], "1er"),
    new Question("8: Combien en pourcentage de la pêche fraiche française ?", ["25%", "30%", "35%"], "25%"),
    new Question("9: Combien en pourcentage de la pêche fraiche bretonne ?", ["40%", "50%", "60%"], "50%"),


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
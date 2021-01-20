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
    new Question("1. En quelle année fut créer le festival de Cornouaille ?", ["1947", "1923", "1958"], "1923"),
    new Question("2. Quel pourcentage représente la filière agroalimentaire par rapport à l’ensemble des emplois industriels de l’agglomération ?", ["50%", "30%", "60%"], "50%"),
    new Question("3. Quel évènement se déroule chaque été à Concarneau ?", ["1.Les vieilles charrues", "2.Les filets bleus", "3.Le festival de Cornouaille"], "2.Les filets bleus"),
    new Question("4. La Cornouaille est bordée par 451km de côtes.", ["Vrai", "Faux", null], "Vrai"),
    new Question("5. Quelle est la préfecture du Finistère ?", ["1. Quimper", "2. Brest", "3. Concarneau"], "1. Quimper"),
    new Question("6. Quel est le surnom du port de pêche du Guilvinec ?", ["1.Penn sardines", "2.Petite mer", "3.Coeur de la pêche"], "3.Coeur de la pêche"),
    new Question("7. Quel est le premier port de pêche français artisanale ?", ["1.Port de Concarneau", "2.Port de Douarnenez", "3.Port de Guilvinec"], "3.Port de Guilvinec"),
    new Question("8. Quelle a été la durée de construction du phare d’Eckmühl ?", ["1. 2 ans", "2. 4 ans", "3. 6 ans"], "2. 4 ans"),
    new Question("9. A quelle hauteur culminent les flèches de la cathédrale Saint-Corentin de Quimper?", ["1. 69 mètres", "2. 72 mètres", "3. 75 mètres"], "3. 75 mètres"),

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
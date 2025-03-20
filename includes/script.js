//When the project initially loads, the quiz content will show
// current information disappears and the Quiz page (as shown in Figure 2) loads
// (as a Fade-in over 1 second using jQuery) with the message as shown
// ("Welcome, [username]. Good luck!"). Validate that the username is not blank.
//5 Marks When the Questions fade in a Timer must start at the top of the page.
//10 Marks All questions must be within a single form and must include JavaScript validation that checks to make sure the user has answered each question
// (HINT: you may want to use an event handler).
// You must handle the checkbox questions to ensure that the user has selected at least one item.
//Each question must include a HINT anchor that displays a hint message when the user mouses over the word. The hint must use jQuery animation functionality to display the hint (fade in/fade out).
//An example is shown in Figure 3. You MUST include the correct answer as part of your hint message or you will receive a 0 for this section.


class QuizQuestion{
    constructor(_question,_answers,_correct){
        this._question = _question;
        this._answers = _answers;
        this._correct =_correct;
    }
    get question(){
        return this._question;
    }
    set question(value){
        this._question = value;
    }

    get answers(){
        return this._answers;
    }
    set answers(value){
        this._answers = value;
    }

    get correct(){
        return this._correct;
    }
    set correct(value){
        this._correct = value;
    }
}
const question1 = new QuizQuestion("What is the name of the hospital where House worked?",["Georgia General","Princeton-Plainsboro","Pennsylvania Principles","Seattle Grace"], 2);
const question2 = new QuizQuestion("In the 'Autopsy' episode, Chase does what highly unprofessional thing with a young patient?",["Slaps her wrist","Refuses to treat her","Kisses her","Tells her outright she's going to die"], 3);
const question3 = new QuizQuestion("Who was, in theory, House's supervisor?",["Cuddy","Taub","Foreman","Wilson"], 1);
const question4 = new QuizQuestion("What fictional character was House loosely based on?",["Dr. Jekyll","Captain Ahab","Marcus Welby","Sherlock Holmes"], 4);
const question5 = new QuizQuestion("What fictional character was House loosely based on?",["Dr. Jekyll","Captain Ahab","Marcus Welby","Sherlock Holmes"], [4,1]);

const questionList = [question1,question2,question3,question4];

$(document).ready(function() {
    $("#quizContent").hide();
    $("#startQuizBtn").click(() =>{
        const quizPlayer = $("#quizPlayer").val();
        quizPlayer ? startQuiz() : $("#playerInputLabel").toggleClass("shake");
    });
});

let startQuiz = (() => {
    $("#quizGreeting").hide("slow", () => {
        quizQuestions();
        $("#quizContent").delay(500).show("slow");
    });
});


let quizQuestions = (()=>{
    let quizQuestions =  $("#quizContent");
    for(let i =0; i < questionList.length; i++) {
        let quiz = questionList[i];
       quizQuestions.append(`
        <div class="question card mb-2">
        <h4>${quiz.question}</h4>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="option${quiz[1]}}"/>
                <label class="form-check-label" for="option${quiz[1]}}">
                    ${quiz.answers[0]}
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="option${quiz[2]}}"/>
                <label class="form-check-label" for="option${quiz[2]}}">
                    ${quiz.answers[1]}
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="option${quiz[3]}}"/>
                <label class="form-check-label" for="option${quiz[3]}}">
                   ${quiz.answers[2]}
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="option${quiz[4]}}"/>
                <label class="form-check-label" for="option${quiz[4]}}">
                    ${quiz.answers[3]}
                </label>
            </div>
        </div>
        `)
    }
    quizQuestions.append(`
         <div class="question card mb-2">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Default checkbox
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Default checkbox
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Default checkbox
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Default checkbox
              </label>
            </div>
        </div>
    `)
});

let quizGrade = (()=>{
    console.log("you win");
});



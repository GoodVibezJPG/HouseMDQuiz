//My quiz question class, ft. my questions, my answers, the correct answer, and the hint
class QuizQuestion{
    constructor(_question,_answers,_correct, _hint){
        this._question = _question;
        this._answers = _answers;
        this._correct =_correct;
        this._hint = _hint;
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

    get hint(){
        return this._hint;
    }
    set hint(value){
        this._hint = value;
    }

}
const question1 = new QuizQuestion("What is the name of the hospital where House worked?",["Georgia General","Princeton-Plainsboro","Pennsylvania Principles","Seattle Grace"], 2, 'Princeton-Plainsboro');
const question2 = new QuizQuestion("In the 'Autopsy' episode, Chase does what highly unprofessional thing with a young patient?",["Slaps her wrist","Refuses to treat her","Kisses her","Tells her outright she's going to die"], 3, '😘');
const question3 = new QuizQuestion("What was Dr. House's favorite prescription to abuse?",["Vicodin","Adderal","Ozempic","Acetaminophen"], 1, 'Vicodin');
const question4 = new QuizQuestion("What fictional character was House loosely based on?",["Dr. Jekyll","Mr. Hyde","Anakin Skywalker","Sherlock Holmes"], 4, 'Sherlock');
const question5 = new QuizQuestion("Which two charcters 'in theory' are in love",["Dr. James Wilson","Dr. Greg House","Fourmen","Pursuit"], [1,2], 'Greg and James');
const questionList = [question1,question2,question3,question4,question5];
const totalQuestions = questionList.length;

//when document ready
$(document).ready(()=> {
        //hide my stuff that isn't read yet
        $(".quizTimer").hide();
        $(".quizScore").hide();
        $("#quizContent").hide();
        let quizPlayer;
        $("#startQuizBtn").click(() =>{
            quizPlayer = $(".quizPlayer").val();
            //If player name start... if not shake violently
            quizPlayer ? startQuiz(quizPlayer) : $("#playerInputLabel").addClass(".errorText").toggleClass("shake");
        });


    let startQuiz = ((quizPlayer) => {
        $("#quizGreeting").hide(500, () => {
            quizQuestions();
            $("#quizContent").delay(500).fadeIn(1000);
            $('#chosenQuizName').append(`Welcome ${quizPlayer} Goodluck!`)
            startTimer();
        });
    });

    let quizQuestions = (()=>{
        const quizQuestions =  $("#quizContent");
        //Radio questions
        for(let i =0; i < questionList.length-1; i++) {
            let quiz = questionList[i];
           quizQuestions.append(`
            <div id="questionCard${i}" class="question card mb-3 p-2">
            <form>
                <h4>${quiz.question}</h4>
                <hr>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="question${i}" id="question${i}-option1" value="1"/>
                        <label class="form-check-label" for="question${i}-option1">
                            ${quiz.answers[0]}
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="question${i}" id="question${i}-option2" value="2"/>
                        <label class="form-check-label" for="question${i}-option2">
                            ${quiz.answers[1]}
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="question${i}" id="question${i}-option3" value="3"/>
                        <label class="form-check-label" for="question${i}-option3">
                           ${quiz.answers[2]}
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="question${i}" id="question${i}-option4" value="4"/>
                        <label class="form-check-label" for="question${i}-option4">
                            ${quiz.answers[3]}
                        </label>
                    </div>
           
                <div>
                    <p class="hintLabel" id="question${i}-hintLabel">|HINT|<span id="showQuestion${i}Hint"> = ${quiz.hint}</span></p>
                </div>
            </div>
            </form>
            `)
            //This feels like a cheap wrong way to do this, theres probably a way to do $(this) and maybe something regarding children
            //This comment is here to ask joe about it, or to fix lata
            let hintLabel = `#question${i}-hintLabel`
            let showHint = `#showQuestion${i}Hint`
            $(showHint).hide();
            $(hintLabel).hover(()=>{
                $(showHint).fadeIn();
            }, ()=>{
                $(showHint).fadeOut();
            });
        }
        //Checkbox question
        quizQuestions.append(`
             <div class="question card mb-3 p-2">
             <form>
             <h4>${question5.question}</h4>
             <hr>
                <div class="form-check">
                  <input class="form-check-input" name="question5-option1" type="checkbox" value="1" id="flexCheckDefault1">
                  <label class="form-check-label" for="flexCheckDefault1">
                     ${question5.answers[0]}
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" name="question5-option2" type="checkbox" value="2" id="flexCheckDefault2">
                  <label class="form-check-label" for="flexCheckDefault2">
                     ${question5.answers[1]}
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" name="question5-option3" type="checkbox" value="3" id="flexCheckDefault3">
                  <label class="form-check-label" for="flexCheckDefault3">
                     ${question5.answers[2]}
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" name="question5-option4" type="checkbox" value="4" id="flexCheckDefault4">
                  <label class="form-check-label" for="flexCheckDefault4">
                     ${question5.answers[3]}
                  </label>
                </div>
                <div>
                    <p id="question5-hintLabel" style="cursor: help;">|HINT|<span id="showQuestion5Hint"> = ${question5.hint}</span></p>
                </div>
            </div>
            <div>
                <button id="submitQuiz" class="btn btn-primary">Submit</button>
            </div>
            </form>
        `);
        $("#showQuestion5Hint").hide();
        $("#question5-hintLabel").hover(()=>{
            $("#showQuestion5Hint").fadeIn();
        }, ()=>{
            $("#showQuestion5Hint").fadeOut();
        });
        //Finish the quiz, submit and stop timer
        $("#submitQuiz").click(()=>{
            stopTimer();
            quizGrade();
        });
    });

    //Timer
    let timer = null;
    let startTime = 0;
    let elapsedTime = 0;
    let isRunning = false;
    let displayTime = $(".quizTimer");

    let startTimer = (()=> {
        //Fade in timer
        $(".quizTimer").fadeIn(1000);
        //Is it running? No?? then start the timer
        if(!isRunning){
            startTime = Date.now() - elapsedTime;
            //Update timer every half second
            timer = setInterval(updateTime, 500);
            isRunning = true;
        }
    });
    let stopTimer = (()=> {
        //Is it running? Yes?? then STOP the timer
        if(isRunning){
            clearInterval(timer);
            elapsedTime = Date.now() - startTime;
            isRunning = false;
        }
    });
    //update the time, displaying the min and sec
    let updateTime = (()=>{
        const currentTime = Date.now();
        elapsedTime = currentTime - startTime;

        //Round and make string, and show the extra 0
        let min = (Math.floor(elapsedTime / (1000 * 60))).toString().padStart(2,"0");
        let sec = (Math.floor(elapsedTime / 1000 % 60)).toString().padStart(2,"0");

        displayTime.text(`${min}:${sec}`);
    });


    //Calculate Quiz Grade
    let quizGrade = (()=> {
        //We are keeping score
        let score = 0;

        //Check if my inputs values are equal to my correct ones
        for (let i = 0; i < questionList.length-1; i++) {
            let quiz = questionList[i];
            // The zero is for empties
            let selectedAnswer = parseInt($(`input[name="question${i}"]:checked`).val() || 0);
            let correctAnswer = quiz.correct;
            if(selectedAnswer === correctAnswer){
                score++;
            }
        }

        //There is a probably a better way to do this, im guessing mapping to a new array and seeing if it's equal
        //Or perhaps loops through each check and comparing that to the correct ones, at this given moment I could not figure that out
        let checkBoxCheck1 = parseInt($(`input[name="question5-option1"]:checked`).val());
        let checkBoxCheck2 =  parseInt($(`input[name="question5-option2"]:checked`).val());
        if(checkBoxCheck1 === question5.correct[0] && checkBoxCheck2 === question5.correct[1]){
            score++;
        }

        //show quiz results based on score
        quizResults(score);
    });

    let quizResults = ((score) => {
        let quizScore = $(".quizScore");
        $("#submitQuiz").hide(); //hide button
        $("#quizModal").modal("show"); //show my modal
        $("html, body").animate({ scrollTop: 0 }, "fast"); //Scroll to top of page
        if(score === totalQuestions){
            //Super cool strobe effect with bold text,
            quizScore.css("font-weight", "bold");
            quizScore.prepend(`${quizPlayer}<br>`);
            quizScore.append(`PERFECT SCORE!!! - ${score}/${totalQuestions}`).fadeIn(3000, () => {
                let fadeCount = 0;
                while (fadeCount <= 10) {
                    quizScore.fadeIn(300).fadeOut(300);
                    fadeCount++;
                }
                quizScore.fadeIn(300);
            });
        } else { 
            quizScore.append(`Good job ${quizPlayer}! ${score}/${totalQuestions}`).fadeIn(3000);
            
        }

    });
});

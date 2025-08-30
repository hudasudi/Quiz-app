//Quiz App Questions
const questions = [
  {
    question: "which one is the largest continent in the world? ",
    answers: [
      {text:"Australia" , correct: false},
      {text:"Africa", correct:false},
      {text:"Asia", correct:true},
      {text:"Europe", correct:false}
    ]
  },
  {
    question: "Which one is the smallest country in the world? ",
    answers: [
      {text:"Russia" , correct:false},
      {text:"Vatican city", correct:true},
      {text:"San Marino", correct:false},
      {text:"Monaco", correct:false}
    ]
  },
    {
    question: "Which one is the capital city of Scotland? ",
    answers: [
      {text:"St Andrews" , correct:false},
      {text:"Glasgow", correct:false},
      {text:"Aberdeen", correct:false},
      {text:"Edinburgh", correct:true}
    ]
  },
    {
    question: "Which one is top 1 hardest language?",
    answers: [
      {text:"Arabic" , correct:false},
      {text:"Japanese", correct:false},
      {text:"Russian", correct:false},
      {text:"Mandarin Chinese", correct:true}
    ]
  },
    {
    question: "Which one is top 1 easiest language? ",
    answers: [
      {text:"Spanish" , correct:true},
      {text:"French", correct:false},
      {text:"Portuguese", correct:false},
      {text:"Norwegian", correct:false}
    ]
  }
];

//DOM elements
const questionElem = document.getElementById("question");
const answersBtns = document.getElementById("answer-btn");
const nextQbtn = document.getElementById("next-q");

let i = 0;
let score = 0; // tracks how many correct answers the user got

//start quix from beginning 
function startQuiz(){
  i = 0;
  score = 0;
  nextQbtn.innerHTML = "Next"; 
 showQuestion();
}

//Display the current questions and its answers
function showQuestion(){
  resetState()
let currentQ = questions[i];
let questionNo = i + 1;
questionElem.innerHTML = questionNo + ". " + currentQ.question;

//create a button for each answer
currentQ.answers.forEach(answer => {
  const button = document.createElement("button");
  button.innerHTML = answer.text;
  button.classList.add("btn");
  answersBtns.appendChild(button);

  if(answer.correct){
    button.dataset.correct = answer.correct;
  }
  button.addEventListener("click", selectAnswer);
});
}
//clear previous answers anf hide the next button
function resetState(){
  nextQbtn.style.display = "none";
  while(answersBtns.firstChild){
    answersBtns.removeChild(answersBtns.firstChild);
  }
}
// handle the right and wrong answers/ user selection
function selectAnswer(e){
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";

  if(isCorrect){
    selectBtn.classList.add("correct");
    score++;
  }else{
    selectBtn.classList.add("incorrect");
  }
// shows the correct answer + hides all buttons
  Array.from(answersBtns.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextQbtn.style.display = "block";
}
// display the final grade of Quiz app + you can play again
function showScore(){
  resetState();
  questionElem.innerHTML = `You Scored ${score} Out Of ${questions.length} !`;
  nextQbtn.innerHTML = "Play Again";
  nextQbtn.style.display = "block";
}
// move to the next question or end quiz
function handleNextButton(){
  i++;
  if(i < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}
// next button click handler
nextQbtn.addEventListener("click", () =>{
  if(i < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});

startQuiz();
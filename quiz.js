
const questions = [
  {
    question: "which one is the largset continent in the world? ",
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
      {text:"Norwegian", correct:false},
      {text:"Mandarin Chinese", correct:true}
    ]
  },
    {
    question: "Which one is top 1 easiest language? ",
    answers: [
      {text:"Spanish" , correct:false},
      {text:"French", correct:true},
      {text:"Portuguese", correct:false},
      {text:"German", correct:false}
    ]
  }
];

const questionElem = document.getElementById("question");
const answersBtns = document.getElementById("answer-btn");
const nextQbtn = document.getElementById("next-q");

let i = 0;
let score = 0;

function startQuiz(){
  i = 0;
  score = 0;
  nextQbtn.innerHTML = "Next"; 
 showQuestion();
}

function showQuestion(){
  resetState()
let currentQ = questions[i];
let questionNo = i + 1;
questionElem.innerHTML = questionNo + ". " + currentQ.question;

// answersBtns.innerHTML = "";
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

function resetState(){
  nextQbtn.style.display = "none";
  while(answersBtns.firstChild){
    answersBtns.removeChild(answersBtns.firstChild);
  }
}

function selectAnswer(e){
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";

  if(isCorrect){
    selectBtn.classList.add("correct");
    score++;
  }else{
    selectBtn.classList.add("incorrect");
  }

  Array.from(answersBtns.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextQbtn.style.display = "block";
}

function showScore(){
  resetState();
  questionElem.innerHTML = `You Scored ${score} Out Of ${questions.length} !`;
  nextQbtn.innerHTML = "Play Again";
  nextQbtn.style.display = "block";
}

function handleNextButton(){
  i++;
  if(i < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextQbtn.addEventListener("click", () =>{
  if(i < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});

startQuiz();
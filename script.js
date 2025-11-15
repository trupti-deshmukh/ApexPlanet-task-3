// ------- QUIZ APP -------
const quizData = [
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS",
  },
  {
    question: "Which tag is used for JavaScript?",
    options: ["<java>", "<script>", "<js>", "<code>"],
    answer: "<script>",
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Netscape", "Bell Labs", "Sun Microsystems", "IBM"],
    answer: "Netscape",
  },
  {
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Management", "Desktop Oriented Mode", "Document Oriented Model"],
    answer: "Document Object Model",
  },
];

let current = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  const q = quizData[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsEl.appendChild(btn);
  });
}
function checkAnswer(selected) {
  const correct = quizData[current].answer;
  if (selected === correct) {
    score++;
  }
  Array.from(optionsEl.children).forEach(btn => btn.disabled = true);
}
nextBtn.onclick = () => {
  current++;
  if (current < quizData.length) loadQuestion();
  else {
    questionEl.textContent = "Quiz Completed!";
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
    scoreEl.textContent = `Your Score: ${score}/${quizData.length}`;
  }
};
loadQuestion();

// ------- JOKE GENERATOR -------
const jokeBtn = document.getElementById("jokeBtn");
const jokeText = document.getElementById("jokeText");

async function getJoke() {
  jokeText.textContent = "Loading...";
  try {
    const res = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await res.json();
    jokeText.textContent = `${data.setup} 🤔 ... ${data.punchline}`;
  } catch (err) {
    jokeText.textContent = "Oops! Couldn’t fetch a joke 😅";
  }
}
jokeBtn.addEventListener("click", getJoke);

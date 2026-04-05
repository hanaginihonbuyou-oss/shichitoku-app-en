let currentQuestion = 0;

const questions = [
  {
    q: "When making an important decision, what do you value most?",
    a: [
      { text: "Doing what is right, even if it's difficult", type: "justice" },
      { text: "Taking action without fear", type: "courage" },
      { text: "Caring for others and maintaining harmony", type: "benevolence" },
      { text: "Acting with proper manners and respect", type: "respect" }
    ]
  },
  {
    q: "How do you face challenges?",
    a: [
      { text: "Face them directly and bravely", type: "courage" },
      { text: "Think carefully before acting", type: "justice" },
      { text: "Seek harmony and avoid unnecessary conflict", type: "benevolence" },
      { text: "Stay true to your principles", type: "integrity" }
    ]
  }
];

let scores = {
  justice: 0,
  courage: 0,
  benevolence: 0,
  respect: 0,
  integrity: 0,
  honor: 0,
  loyalty: 0
};

function startQuiz() {
  currentQuestion = 0;
  showQuestion();
}

function showQuestion() {
  const quizDiv = document.getElementById("quiz");
  const q = questions[currentQuestion];

  quizDiv.innerHTML = `<h2>${q.q}</h2>`;

  q.a.forEach(answer => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    btn.onclick = () => selectAnswer(answer.type);
    quizDiv.appendChild(btn);
  });
}

function selectAnswer(type) {
  scores[type]++;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const resultDiv = document.getElementById("result");

  let maxType = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  resultDiv.innerHTML = `<h2>Your result: ${maxType}</h2>`;
}

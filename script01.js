let currentQuestion = 0;

let scores = {
  justice: 0,
  courage: 0,
  benevolence: 0,
  respect: 0,
  integrity: 0,
  honor: 0,
  loyalty: 0
};

const questions = [
  {
    q: "When making an important decision, what matters most to you?",
    a: [
      { text: "Doing what is right, even if it is difficult", type: "justice" },
      { text: "Having the courage to act", type: "courage" },
      { text: "Choosing what brings peace to others", type: "benevolence" },
      { text: "Acting with grace and proper conduct", type: "respect" }
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
  },
  {
    q: "What kind of person do you trust most?",
    a: [
      { text: "Someone who keeps their word", type: "integrity" },
      { text: "Someone who acts with loyalty", type: "loyalty" },
      { text: "Someone who shows respect to all", type: "respect" },
      { text: "Someone with a strong sense of fairness", type: "justice" }
    ]
  },
  {
    q: "What kind of strength do you admire most?",
    a: [
      { text: "The strength to protect others", type: "benevolence" },
      { text: "The strength to remain honorable", type: "honor" },
      { text: "The strength to stand firm in adversity", type: "courage" },
      { text: "The strength to remain disciplined", type: "respect" }
    ]
  },
  {
    q: "What do you value most in relationships?",
    a: [
      { text: "Mutual trust and sincerity", type: "integrity" },
      { text: "Devotion and standing by one another", type: "loyalty" },
      { text: "Kindness and understanding", type: "benevolence" },
      { text: "Respect and dignity", type: "respect" }
    ]
  },
  {
    q: "When others rely on you, how do you respond?",
    a: [
      { text: "I take responsibility and do what is right", type: "justice" },
      { text: "I support them with compassion", type: "benevolence" },
      { text: "I protect the trust placed in me", type: "loyalty" },
      { text: "I try to respond with dignity and care", type: "honor" }
    ]
  },
  {
    q: "What kind of life feels most true to you?",
    a: [
      { text: "A life guided by justice and conviction", type: "justice" },
      { text: "A life of bold action and courage", type: "courage" },
      { text: "A life of sincerity and moral purpose", type: "integrity" },
      { text: "A life of loyalty, devotion, and inner strength", type: "loyalty" }
    ]
  }
];

const resultsMap = {
  justice: "Uesugi Kenshin (Justice)",
  courage: "Tomoe Gozen (Courage)",
  benevolence: "Niijima Yae (Benevolence)",
  respect: "Sen no Rikyu (Respect)",
  integrity: "Yoshida Shoin (Integrity)",
  honor: "Takeda Shingen (Honor)",
  loyalty: "Hojo Masako (Loyalty)"
};

function startQuiz() {
  currentQuestion = 0;

  scores = {
    justice: 0,
    courage: 0,
    benevolence: 0,
    respect: 0,
    integrity: 0,
    honor: 0,
    loyalty: 0
  };

  document.getElementById("result").innerHTML = "";
  showQuestion();
}

function showQuestion() {
  const quizDiv = document.getElementById("quiz");
  const q = questions[currentQuestion];

  let html = "<h2>" + (currentQuestion + 1) + ". " + q.q + "</h2>";

  q.a.forEach(function(answer) {
    html += "<button onclick=\"selectAnswer('" + answer.type + "')\">" + answer.text + "</button><br><br>";
  });

  quizDiv.innerHTML = html;
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
  const quizDiv = document.getElementById("quiz");
  const resultDiv = document.getElementById("result");

  const sortedTypes = Object.keys(scores).sort(function(a, b) {
    return scores[b] - scores[a];
  });

  const mainType = sortedTypes[0];
  const subType = sortedTypes[1];

  quizDiv.innerHTML = "";

  resultDiv.innerHTML =
    "<h2>Your result</h2>" +
    "<p><strong>Main:</strong> " + resultsMap[mainType] + "</p>" +
    "<p><strong>Second:</strong> " + resultsMap[subType] + "</p>";
}

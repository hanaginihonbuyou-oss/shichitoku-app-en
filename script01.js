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
    q: "What quietly guides your decisions?",
    a: [
      { text: "A sense of what is right, even without recognition", type: "justice" },
      { text: "The courage to step forward without hesitation", type: "courage" },
      { text: "A desire to bring peace to others", type: "benevolence" },
      { text: "The awareness of how one should carry oneself", type: "respect" }
    ]
  },
  {
    q: "When facing difficulty, what rises within you first?",
    a: [
      { text: "A will to stand firm, no matter the outcome", type: "courage" },
      { text: "A calm reflection before taking action", type: "justice" },
      { text: "A wish to avoid conflict and keep harmony", type: "benevolence" },
      { text: "A determination to remain true to your principles", type: "integrity" }
    ]
  },
  {
    q: "What kind of presence do you trust the most?",
    a: [
      { text: "One who acts with quiet sincerity", type: "integrity" },
      { text: "One who stays devoted without wavering", type: "loyalty" },
      { text: "One who respects others in every situation", type: "respect" },
      { text: "One who carries a strong sense of justice", type: "justice" }
    ]
  },
  {
    q: "What kind of strength do you find most admirable?",
    a: [
      { text: "The strength to protect and support others", type: "benevolence" },
      { text: "The strength to uphold dignity and honor", type: "honor" },
      { text: "The strength to move forward despite fear", type: "courage" },
      { text: "The strength to remain disciplined and composed", type: "respect" }
    ]
  },
  {
    q: "In relationships, what feels most essential to you?",
    a: [
      { text: "Trust that is built through honesty", type: "integrity" },
      { text: "A bond that does not easily break", type: "loyalty" },
      { text: "Gentle understanding and compassion", type: "benevolence" },
      { text: "Mutual respect and graceful distance", type: "respect" }
    ]
  },
  {
    q: "When someone relies on you, how do you respond?",
    a: [
      { text: "By doing what must be done, without compromise", type: "justice" },
      { text: "By offering warmth and support", type: "benevolence" },
      { text: "By protecting the trust placed in you", type: "loyalty" },
      { text: "By responding with dignity and care", type: "honor" }
    ]
  },
  {
    q: "What kind of life feels most true to you?",
    a: [
      { text: "A life guided by an inner sense of justice", type: "justice" },
      { text: "A life that embraces boldness and courage", type: "courage" },
      { text: "A life rooted in sincerity and purpose", type: "integrity" },
      { text: "A life devoted to loyalty and inner strength", type: "loyalty" }
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

const resultMessages = {
  justice: "You are guided by conviction, fairness, and a strong inner compass. You value what is right, even when the path is not easy.",
  courage: "You move forward with bravery and spirit. Even in uncertainty, you are willing to act with strength and resolve.",
  benevolence: "You carry warmth, empathy, and a deep wish to protect others. Your strength appears through kindness and care.",
  respect: "You value refinement, dignity, and the beauty of proper conduct. You bring harmony through awareness and grace.",
  integrity: "You are sincere, thoughtful, and true to your beliefs. Your honesty and purpose shape the way you live.",
  honor: "You value dignity, pride, and the strength to uphold your name and responsibilities. There is nobility in your presence.",
  loyalty: "You are devoted, steadfast, and deeply rooted in commitment. You protect the bonds and promises that matter to you."
};

const followMessages = {
  justice: "Your secondary type adds another layer to your sense of purpose and direction.",
  courage: "Your secondary type adds momentum and boldness to your character.",
  benevolence: "Your secondary type softens your strength with warmth and humanity.",
  respect: "Your secondary type brings elegance, mindfulness, and composure.",
  integrity: "Your secondary type deepens your sincerity and sense of mission.",
  honor: "Your secondary type adds pride, discipline, and noble presence.",
  loyalty: "Your secondary type strengthens your devotion and constancy."
};

const terakoyaMessages = {
  justice: "A path of conviction can become a bridge to deeper encounters with Japanese culture.",
  courage: "Your bold spirit may find new inspiration through Japanese cultural values and lived traditions.",
  benevolence: "Your kindness may open the door to meaningful encounters within the circle of culture.",
  respect: "Your sense of grace may resonate deeply with the spirit of Japanese arts and etiquette.",
  integrity: "Your sincerity may lead you toward a profound connection with the heart of Japanese culture.",
  honor: "Your noble spirit may discover new meaning through cultural depth and disciplined beauty.",
  loyalty: "Your devotion may find quiet strength in the enduring ties woven through Japanese tradition."
};

function startQuiz() {
  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();

  if (!name) {
    alert("Please enter your name.");
    return;
  }

  window.userName = name;
  window.userEmail = email;

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

  let html = "";
  html += "<div class='question-number'>Question " + (currentQuestion + 1) + " of " + questions.length + "</div>";
  html += "<h2 class='question-title'>" + q.q + "</h2>";

  q.a.forEach(function(answer) {
    html += "<button class='answer-btn' onclick=\"selectAnswer('" + answer.type + "')\">" + answer.text + "</button>";
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
    "<h2 class='result-title'>Your Result</h2>" +
    "<p><strong>Name:</strong> " + window.userName + "</p>" +
    "<p class='result-main'><strong>Primary Type:</strong> " + resultsMap[mainType] + "</p>" +
    "<p class='result-sub'><strong>Secondary Type:</strong> " + resultsMap[subType] + "</p>" +
    "<p class='result-message'>" + resultMessages[mainType] + "</p>" +
    "<p class='result-follow'>" + followMessages[subType] + "</p>" +
    "<p class='result-terakoya'><strong>A message from Terakoya:</strong> " + terakoyaMessages[mainType] + "</p>" +
    "<div class='action-row'>" +
      "<a class='link-btn' href='https://terakoya-education-fsprhpr.gamma.site/' target='_blank'>Visit the English Terakoya Page</a>" +
      "<button class='retry-btn' onclick='startQuiz()'>Try Again</button>" +
    "</div>";
}

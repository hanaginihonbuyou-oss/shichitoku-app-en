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

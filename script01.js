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
  justice: "You are the Justice type, aligned with Uesugi Kenshin. You are guided by an inner sense of what is right, even when the path is not easy. Quietly, firmly, you seek a life that does not betray your principles.",
  courage: "You are the Courage type, aligned with Tomoe Gozen. When the moment calls, you step forward. Your strength is not loud bravado, but the power to move through fear with clarity and resolve.",
  benevolence: "You are the Benevolence type, aligned with Yae Niijima. Your strength lives in compassion. You do not simply protect yourself — you hold space for others, and bring warmth where it is needed most.",
  respect: "You are the Respect type, aligned with Sen no Rikyu. You value presence, attentiveness, and the beauty of what is quietly shared. In a restless world, you are drawn to depth, grace, and meaningful form.",
  integrity: "You are the Integrity type, aligned with Yoshida Shoin. You seek honesty that begins within. To live truthfully matters more to you than appearances, and your words carry weight when they rise from conviction.",
  honor: "You are the Honor type, aligned with Takeda Shingen. You are driven to live in a way that you can stand by. Dignity, responsibility, and self-respect shape your path more than praise from others.",
  loyalty: "You are the Loyalty type, aligned with Hojo Masako. Once you choose what matters, you do not turn away easily. Your strength lies in devotion, endurance, and the will to remain when others retreat."
};

const followMessages = {
  justice: "You may be someone who cannot look away when something feels deeply misaligned. Even in silence, your heart keeps asking what is right.",
  courage: "You may be someone who meets life by stepping into it. Even when uncertain, something in you chooses forward over retreat.",
  benevolence: "You may be someone whose care is quietly transformative. Others may feel at ease in your presence without fully knowing why.",
  respect: "You may be someone who senses meaning in small gestures. You are likely drawn not to noise, but to refinement, rhythm, and sincerity.",
  integrity: "You may be someone who struggles to live half-heartedly. When something is false, you feel it quickly — and cannot remain there for long.",
  honor: "You may be someone who values the way one stands in the world. Pride, for you, is not vanity, but a discipline of bearing and choice.",
  loyalty: "You may be someone who remains true beyond convenience. Your commitments are rarely casual — they are chosen with the heart, and carried with strength."
};

const terakoyaMessages = {
  justice: "If this way of being resonates with you, Wa-gokoro Terakoya may offer a deeper doorway. Through Japanese culture, gesture, and thought, you may find language for what you have long felt.",
  courage: "If this spirit speaks to you, Wa-gokoro Terakoya may be a place to explore it further. Japanese culture holds many forms of strength — not only in action, but in presence, discipline, and inner poise.",
  benevolence: "If this quiet warmth feels familiar, Wa-gokoro Terakoya may offer a meaningful next step. Within Japanese culture live gestures of care, thoughtfulness, and beauty that are meant to be lived, not only understood.",
  respect: "If this sensibility draws you in, Wa-gokoro Terakoya may feel like a natural place to continue. Japanese culture preserves many subtle arts of presence — ways of seeing, receiving, and shaping the atmosphere between people.",
  integrity: "If this truth feels close to your heart, Wa-gokoro Terakoya may offer a path worth encountering. Japanese culture carries disciplines that ask not only what you do, but how you stand, speak, and live.",
  honor: "If this dignity resonates with you, Wa-gokoro Terakoya may open another layer of understanding. Japanese culture holds refined ways of carrying oneself — with form, restraint, and quiet pride.",
  loyalty: "If this devotion feels true to you, Wa-gokoro Terakoya may be a meaningful encounter. In Japanese culture, there are many ways to learn steadfastness — not as rigidity, but as a beautiful way of remaining true."
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
　window.mainType = mainType;
　window.subType = subType;
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

saveEnglishResult(mainType, subType);
}

function saveEnglishResult(mainType, subType) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://script.google.com/macros/s/AKfycbyRB7m3G_R5Ez_4ks1lRqOHRWLFCXirDx6lLmdmiazpYyzmGc4N1-C99D0PZ9-_8tCOMg/exec";
  form.target = "hidden_iframe";
  form.style.display = "none";

 const fields = {
  mode: "result",
  session_id: window.enSessionId || "",
  name: window.userName || "",
  email: window.userEmail || "",
  primary: mainType,
  secondary: subType,
  language: "English",
  hp_click: "No"
};

  Object.keys(fields).forEach(function(key) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = fields[key];
    form.appendChild(input);
  });

  let iframe = document.getElementById("hidden_iframe");
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.name = "hidden_iframe";
    iframe.id = "hidden_iframe";
    iframe.style.display = "none";
    document.body.appendChild(iframe);
  }

  document.body.appendChild(form);
  form.submit();

  setTimeout(function() {
    form.remove();
  }, 1000);
}
function trackEnHpClick() {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://script.google.com/macros/s/AKfycbyRB7m3G_R5Ez_4ks1lRqOHRWLFCXirDx6lLmdmiazpYyzmGc4N1-C99D0PZ9-_8tCOMg/exec";
  form.target = "hidden_iframe";
  form.style.display = "none";

  const fields = {
    mode: "click",
    name: window.userName || "",
    email: window.userEmail || "",
    primary: window.mainType || "",
    secondary: window.subType || "",
    language: "English"
  };

  Object.keys(fields).forEach(function(key) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = fields[key];
    form.appendChild(input);
  });

  let iframe = document.getElementById("hidden_iframe");
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.name = "hidden_iframe";
    iframe.id = "hidden_iframe";
    iframe.style.display = "none";
    document.body.appendChild(iframe);
  }

  document.body.appendChild(form);
  form.submit();

  setTimeout(function() {
    form.remove();
  }, 1000);
}

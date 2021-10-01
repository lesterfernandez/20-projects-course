const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

let words = [];
const wordAmount = 140;
let randomWord;
let score = 0;
let time = 10;
const timeInterval = setInterval(updateTime, 1000);
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "easy";

async function getWords() {
  difficultySelect.value =
    localStorage.getItem("difficulty") !== null
      ? localStorage.getItem("difficulty")
      : "easy";

  words = await (
    await fetch(`https://random-word-api.herokuapp.com/word?number=${wordAmount}`)
  ).json();
  addWordToDOM();
  text.focus();
}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function updateTime() {
  if (time === 0) {
    clearInterval(timeInterval);

    gameOver();
  }
  time--;
  timeEl.innerText = time + "s";
}

function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="window.location.reload()">Play Again</button>
  `;
  endgameEl.style.display = "flex";
}

function containsSubstr(originalString, internalString) {
  let string = originalString.split("");
  let subStr = internalString.split("");

  for (let i = 0; i < subStr.length; i++) {
    if (string[i] !== subStr[i]) return false;
  }
  return true;
}

getWords();

text.addEventListener("input", e => {
  const insertedText = e.target.value;

  if (containsSubstr(randomWord, insertedText)) {
    text.style.color = "green";
  } else {
    text.style.color = "red";
  }

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    text.style.color = "black";
    e.target.value = "";

    switch (difficulty) {
      case "hard":
        time += 3;
        break;
      case "medium":
        time += 5;
        break;
      case "easy":
        time += 11;
        break;
    }

    updateTime();
  }
});

settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

settingsForm.addEventListener("change", e => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

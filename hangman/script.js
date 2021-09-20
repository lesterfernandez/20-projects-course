const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "application",
  "programming",
  "framework",
  "helloworld",
  "lester",
  "javascript",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
  wordEl.innerHTML = `
  ${selectedWord
    .split("")
    .map(
      letter =>
        `<span class="letter">${correctLetters.includes(letter) ? letter : ""}</span>`
    )
    .join("")} 
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    console.log("lost");
    finalMessage.innerText = "Congratulations! You won! 😃";
    popup.style.display = "flex";
  }
}

function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  // Display body parts
  figureParts.forEach((part, i) => {
    const errors = wrongLetters.length;

    if (i < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost.. 😕";
    popup.style.display = "flex";
  }
}

function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

window.addEventListener("keydown", e => {
  const keyPressed = e.key.toString().toLowerCase();
  const regex = new RegExp(/^[a-z]{1}$/i);

  if (regex.test(keyPressed)) {
    // valid input
    if (selectedWord.includes(keyPressed)) {
      // correct letter
      if (!correctLetters.includes(keyPressed)) {
        correctLetters.push(keyPressed);

        displayWord();
      } else {
        // letter already entered
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(keyPressed)) {
        // wrong letter
        wrongLetters.push(keyPressed);

        updateWrongLettersEl();
      } else {
        // letter already entered
        showNotification();
      }
    }
  }
});

playAgainBtn.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();
  popup.style.display = "none";
});

displayWord();

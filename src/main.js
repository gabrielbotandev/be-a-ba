import { game } from "./game.js";

const newGameButtonElem = document.getElementById("new-game");
const inputElem = document.getElementById("word");
const errorElem = document.getElementById("error");
const streakElem = document.getElementById("streak");
const streakText = document.getElementById("streakText");
const wordList = document.getElementById("wordList");
const wordListTitle = document.getElementById("wordListTitle");

newGameButtonElem.addEventListener("click", function () {
  game.newGame();
  const lettersElem = document.querySelectorAll(".square");

  for (let i = 0; i < lettersElem.length; i++) {
    lettersElem[i].innerHTML = game.letters[i].toUpperCase();
  }

  inputElem.disabled = false;
  inputElem.value = "";
  inputElem.focus();
  errorElem.style.visibility = "hidden";
  streakText.style.visibility = "visible";
  streakElem.innerHTML = "0";
  wordList.innerHTML = "";
  wordList.style.visibility = "visible";
  wordListTitle.style.visibility = "visible";
});

document
  .getElementById("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const word = formData.get("word");

    const isWordValid = await game.validateWord(word.toLocaleLowerCase());
    if (isWordValid) {
      streakElem.innerHTML = game.streak;
      errorElem.style.visibility = "hidden";
      inputElem.value = "";

      const correctWord = document.createElement("p");
      correctWord.textContent = word.toLocaleLowerCase();
      wordList.appendChild(correctWord);
    } else {
      errorElem.style.visibility = "visible";
    }
  });

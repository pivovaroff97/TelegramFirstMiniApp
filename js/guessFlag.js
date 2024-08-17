const flags = [];
let level = 0;

fetch('https://restcountries.com/v3.1/all?fields=name,flags')
  .then(response => response.json())
  .then(data => {
    data.forEach(d => {
      flags.push({
        src: d.flags.svg,
        name: d.name.common
      });
    });
    loadNewFlag();
  });

function getRandomOptions(correctAnswer) {
  const shuffled = flags
    .filter(flag => flag.name !== correctAnswer.name)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return [...shuffled, correctAnswer].sort(() => 0.5 - Math.random());
}

let currentFlag = {};

function loadNewFlag() {
  const randomIndex = Math.floor(Math.random() * flags.length);
  currentFlag = flags[randomIndex];

  document.getElementById("flag").src = currentFlag.src;

  const options = getRandomOptions(currentFlag);
  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = '';

  options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option.name;
    button.className = "button";
    button.addEventListener("click", checkAnswer);
    optionsContainer.appendChild(button);
  });
}

function checkAnswer(event) {
  const selectedAnswer = event.target.textContent;

  if (selectedAnswer === currentFlag.name) {
    level++;
    loadNewFlag();
  } else {
    const p = document.getElementById("resultId");
    p.innerHTML = 'Right answer is ' + currentFlag.name + '. Your score is ' + level;
    btn.innerHTML = 'Start over';
    modal.style.display = "block";
    level = 0;
  }
}

// Get the modal
const modal = document.getElementById("resultModal");

// Get the button that opens the modal
const btn = document.getElementById("continueButtonId");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

btn.onclick = function () {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

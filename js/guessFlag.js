let flags = [];
let level = 0;

function getCountries(region) {
  if (region !== 'all') {
    region = 'region/' + region;
  }
  fetch('https://restcountries.com/v3.1/' + region + '?fields=name,flags')
    .then(response => response.json())
    .then(data => {
      flags = [];
      data.forEach(d => {
        flags.push({
          src: d.flags.svg,
          name: d.name.common
        });
      });
      loadNewFlag();
    });
}

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
  } else {
    const p = document.getElementById("resultId");
    p.innerHTML = 'Right answer is ' + currentFlag.name + '. Your score is ' + level;
    btn.innerHTML = 'Start over';
    modal.style.display = "block";
    level = 0;
  }
  loadNewFlag();
}

function saveSettings() {
  const categories = document.getElementById("dropdown");
  getCountries(categories.value);
  settingModal.style.display = "none";
}

const modal = document.getElementById("result-modal");

const btn = document.getElementById("continueButtonId");

const span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

btn.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
  if (event.target === settingModal) {
    settingModal.style.display = "none";
  }
}

const gear = document.getElementById("settings");

const settingModal = document.getElementById("setting-modal");

const saveSettingsBtn = document.getElementById("saveSettingsBtn");

const spanCloseSettings = document.getElementsByClassName("close")[1];

gear.onclick = function () {
  settingModal.style.display = "block";
}

saveSettingsBtn.onclick = function () {
  settingModal.style.display = "none";
}

spanCloseSettings.onclick = function() {
  settingModal.style.display = "none";
}

//TODO: make one modal window
saveSettingsBtn.onclick = saveSettings;

getCountries('all');

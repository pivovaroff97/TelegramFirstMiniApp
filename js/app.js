var intervalId;
var level = 1;
var sequence = [];


function highlightRandomBlock() {
  const blocks = document.querySelectorAll('.block');
  // Сначала уберем подсветку со всех блоков
  blocks.forEach(block => block.classList.remove('highlight'));

  // Случайный индекс блока
  const randomIndex = Math.floor(Math.random() * blocks.length);
  const randomBlock = blocks[randomIndex];

  // Добавим подсветку
  randomBlock.classList.add('highlight');

  // Удалим подсветку через 1 секунду
  setTimeout(() => {
    randomBlock.classList.remove('highlight');
  }, 1000);
  sequence.push(randomBlock.id);
  if (sequence.length === level) {
    stop();
  }
}

document.getElementById('startButtonId').onclick = start;

function start() {
  // Запускаем подсветку каждые 2 секунды
  intervalId = setInterval(highlightRandomBlock, 2000);
}

function stop() {
  clearInterval(intervalId);
}

const divBlocks = document.getElementsByClassName('block');

const blockPressed = e => {
  const p = document.getElementById("resultId");
  const blockId = sequence.shift();
  if (blockId !== e.target.id) {
    p.innerHTML = 'Your score is ' + (level - 1);
    btn.innerHTML = 'Start over';
    modal.style.display = "block";
    sequence = [];
    level = 1;
  } else if (sequence.length === 0) {
    p.innerHTML = 'Prepare to next level and click Start';
    btn.innerHTML = 'Continue';
    modal.style.display = "block";
    level++;
  }
}

for (let b of divBlocks) {
  b.addEventListener('click', blockPressed);
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

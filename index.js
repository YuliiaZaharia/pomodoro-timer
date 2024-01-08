let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
const clickSound = document.getElementById('clickSound');
const resetSound = document.getElementById('resetSound');
const pomoTimer = document.getElementById('pomoTimer');
const body = document.body;
let time = document.getElementById("time");
let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;
time.textContent = `${minCount + 1}:00`;

startBtn.addEventListener('click', () => {
  clickSound.currentTime = 0; 
  clickSound.play();
});

pause.addEventListener('click', () => {
  clickSound.currentTime = 0; 
  clickSound.play();
});

reset.addEventListener('click', () => {
  resetSound.currentTime = 0; 
  resetSound.play();
});

focusButton.addEventListener('click', () => {
  body.style.backgroundColor = '#ba4849'; 
  focusButton.style.backgroundColor = '#ba4849'; 
  longBreakButton.style.backgroundColor = '#3e3f43'; 
  shortBreakButton.style.backgroundColor = '#3e3f43';
});

shortBreakButton.addEventListener('click', () => {
  body.style.backgroundColor = '#397097'; 
  shortBreakButton.style.backgroundColor = '#397097'; 
  focusButton.style.backgroundColor = '#3e3f43';
  longBreakButton.style.backgroundColor = '#3e3f43'; 
});

longBreakButton.addEventListener('click', () => {
  body.style.backgroundColor = '#38848a'; 
  longBreakButton.style.backgroundColor = '#38848a'; 
  shortBreakButton.style.backgroundColor = '#3e3f43';
});

pomoTimer.addEventListener('click', () => {
  Swal.fire({
    title: 'Good luck!',
    imageUrl: 'pomotech.webp',
    imageWidth: 430,
    imageHeight: 300,
    imageAlt: 'pomodoro'
  });
});

const pomoRelax = document.querySelector('#pomoRelax');
pomoRelax.addEventListener('click', () => {
  myAudio.currentTime = 0; 
  myAudio.play();
});

const relaxButton = document.getElementById('pomoRelax');
const audio = document.getElementById('myAudio');

relaxButton.addEventListener('click', () => {
  audio.play();
});

const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};

reset.addEventListener(
  "click",
  (resetTime = () => {
    pauseTimer();
    switch (active) {
      case "long":
        minCount = 14;
        break;
      case "short":
        minCount = 4;
        break;
      default:
        minCount = 24;
        break;
    }
    count = 59;
    time.textContent = `${minCount + 1}:00`;
  })
);

const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  });
};

focusButton.addEventListener("click", () => {
  removeFocus();
  focusButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 24;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

shortBreakButton.addEventListener("click", () => {
  active = "short";
  removeFocus();
  shortBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 4;
  count = 59;
  time.textContent = `${appendZero(minCount + 1)}:00`;
});

longBreakButton.addEventListener("click", () => {
  active = "long";
  removeFocus();
  longBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 14;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

pause.addEventListener(
  "click",
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pause.classList.remove("show");
    reset.classList.remove("show");
  })
);

startBtn.addEventListener("click", () => {
  reset.classList.add("show");
  pause.classList.add("show");
  startBtn.classList.add("hide");
  startBtn.classList.remove("show");
  if (paused) {
    paused = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      count--;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount != 0) {
          minCount--;
          count = 60;
        } else {
          clearInterval(set);
        }
      }
    }, 1000);
  }
});
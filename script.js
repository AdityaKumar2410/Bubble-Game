let panel = document.querySelector(".pbtm");
let styles = window.getComputedStyle(panel);

let panelWidth =
  panel.clientWidth -
  parseFloat(styles.paddingLeft) -
  parseFloat(styles.paddingRight);
let panelHeight =
  panel.clientHeight -
  parseFloat(styles.paddingTop) -
  parseFloat(styles.paddingBottom);

let bubbleSize = 60;
let gap = 10;
let timer = 60;
let bubblesPerRow = Math.floor(panelWidth / (bubbleSize + gap));
let bubblesPerCol = Math.floor(panelHeight / (bubbleSize + gap));

let totalBubbles = bubblesPerRow * bubblesPerCol;
let hitvalue = document.querySelector("#hitval");
let score = parseInt(document.querySelector("#score").textContent);
let pbtm = document.querySelector(".pbtm");

function getNewhit() {
  var rn = Math.floor(Math.random() * 10);
  hitvalue.textContent = rn;
}

function makeBubble() {
  var clutter = "";
  for (var i = 1; i <= totalBubbles; i++) {
    var rn = Math.floor(Math.random() * 10);
    clutter += `<div class="bubble">${rn}</div>`;
  }
  pbtm.innerHTML = clutter;

  let bubbles = document.querySelectorAll(".bubble");
  bubbles.forEach(element => {
    element.addEventListener("click", () => {
      if (timer > 0) {
        if (hitvalue.textContent === element.textContent) {
          score += 1;
          document.querySelector("#score").textContent = score;
          element.classList.add("correct");
          setTimeout(() => {
            element.remove();
          }, 300);
          getNewhit();
        } else {
          element.classList.add("wrong");
          setTimeout(() => {
            element.classList.remove("wrong");
          }, 300);
        }
      }
    });
  });
}

function gameOver() {
  console.log("Game Over!!");
  pbtm.innerHTML = "<h1>Game Over!!</h1>";
  pbtm.style.display = "flex";
  pbtm.style.justifyContent = "center";
  pbtm.style.alignItems = "center";
  pbtm.style.flexDirection = "column";
  pbtm.style.fontSize = "5vw";
  pbtm.style.fontWeight = "700";

  let button = document.createElement("button");
  button.classList.add("button");
  button.textContent = "New Game";
  button.addEventListener("click", () => {
    execution();
  });
  pbtm.appendChild(button);
}

function runTimer() {
  var timerint = setInterval(() => {
    if (timer > 0) {
      timer--;
      document.querySelector("#timerVal").textContent = timer;
    } else {
      gameOver();
      clearInterval(timerint);
      return;
    }
  }, 1000);
}

function execution() {
  score = 0;
  document.querySelector("#score").textContent = 0;
  timer = 60;
  pbtm.removeAttribute("style");
  pbtm.innerHTML = "";
  getNewhit();
  makeBubble();
  runTimer();
}

execution();

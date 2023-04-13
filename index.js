const playBoard = document.querySelector(".play-Board");
const scoreElement = document.querySelector(".score");
const highscoreElement = document.querySelector(".Highest-Score");

const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5,
  snakeY = 5;
let velocityX = 0,
  velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

// get the high score from localstorge
let highScore = localStorage.getItem("high-score") || 0;
highscoreElement.innerText = `high Score : ${highScore}`;

// pass a random number between 1 and 30 in foodx and foodY
const updateFoodPostion = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

// Handle GameOver
const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert("GameOver Press Ok to Play Again...");
  location.reload();
};

//chang in value of VolcityX and volcityY
const changeDirction = (e) => {
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

// change dir according to the key
controls.forEach((button) =>
  button.addEventListener("click", () =>
    changeDirction({ key: button.dataset.key })
  )
);

const initGame = () => {
  if (gameOver) return handleGameOver();
  let html = `<div class="food" style=" grid-area: ${foodY} / ${foodX};"></div>`;

  if (snakeX === foodX && snakeY === foodY) {
    updateFoodPostion();
    snakeBody.push([foodY, foodX]);
    score++;
    highScore = score >= highScore ? score : highScore;

    localStorage.setItem("high-score", highScore);
    scoreElement.innerText = `Score : ${score}`;
    highscoreElement.innerText = `high Score : ${highScore}`;
  }

  snakeX += velocityX;
  snakeY += velocityY;
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];

  // checke snakeBody
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    return (gameOver = true);
  }

  // add div for each part of the snake body
  for (let i = 0; i < snakeBody.length; i++) {
    html += `<div class="head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`;
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }
  playBoard.innerHTML = html;
};

updateFoodPostion();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keydown", changeDirction);

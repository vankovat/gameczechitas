let width = 600;
let height = 600;
let keys = [];
let scoreElement = document.getElementById("score");
let score = 0;

canvas.width = width;
canvas.height = height;

let ctx = canvas.getContext("2d");

let pill1 = new Image();
pill1.src = "images/pill1.png";

let pill2 = new Image();
pill2.src = "images/pill2.png";

let pill3 = new Image();
pill3.src = "images/pill3.png";

let pill4 = new Image();
pill4.src = "images/pill4.png";

let fruit1 = new Image();
fruit1.src = "images/fruit1.png";

let fruit2 = new Image();
fruit2.src = "images/fruit2.png";

let tea = new Image();
tea.src = "images/tea.png";

let blockSize = 30;

let board = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let wall = new Image();
wall.src = "images/wall3.png";

function generateBoard() {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === 1) {
        ctx.drawImage(wall, x * blockSize, y * blockSize, blockSize, blockSize);
      }
    }
  }
  for (let i = 0; i < pills.length; i++) {
    ctx.drawImage(
      pills[i].imageObject,
      pills[i].x * blockSize,
      pills[i].y * blockSize,
      blockSize,
      blockSize
    );
  }
}

window.addEventListener("load", generateBoard);

let player = {
  x: 8,
  y: 1
};

let hero = new Image();
hero.src = "images/down.png";

function draw() {
  ctx.clearRect(
    player.x * blockSize,
    player.y * blockSize,
    blockSize,
    blockSize
  );
  generateBoard();
  movement();
  collect();
  ctx.drawImage(
    hero,
    player.x * blockSize,
    player.y * blockSize,
    blockSize,
    blockSize
  );
}

window.addEventListener("load", startGame);

document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;

  draw();
});

document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;

  draw();
});

function movement() {
  if (keys[39] && canMove(player.x + 1, player.y)) {
    // šipka doprava
    hero.src = "images/right.png";
    player.x++;
  }

  if (keys[37] && canMove(player.x - 1, player.y)) {
    // šipka doleva
    hero.src = "images/left.png";
    player.x--;
  }

  if (keys[38] && canMove(player.x, player.y - 1)) {
    // šipka nahoru
    hero.src = "images/up.png";
    player.y--;
  }

  if (keys[40] && canMove(player.x, player.y + 1)) {
    // šipka dolů
    hero.src = "images/down.png";
    player.y++;
  }
}

function canMove(x, y) {
  return (
    y >= 0 &&
    y < board.length &&
    x >= 0 &&
    x < board[y].length &&
    board[y][x] != 1
  );
}

let pills = [];

function createPills() {
  pills.push({
    x: 1,
    y: 1,
    imageObject: pill1
  });

  pills.push({
    x: 1,
    y: 15,
    imageObject: pill2
  });

  pills.push({
    x: 14,
    y: 12,
    imageObject: pill3
  });

  pills.push({
    x: 15,
    y: 18,
    imageObject: pill4
  });

  pills.push({
    x: 5,
    y: 11,
    imageObject: fruit1
  });

  pills.push({
    x: 18,
    y: 5,
    imageObject: fruit2
  });

  pills.push({
    x: 11,
    y: 10,
    imageObject: tea
  });
}

function startGame() {
  createPills();
  draw();
}

function collect() {
  for (let i = 0; i < pills.length; i++) {
    if (player.x == pills[i].x && player.y == pills[i].y) {
      pills.splice(i, 1);
      increaseScore();
    }
  }
}

function increaseScore() {
  score++;

  scoreElement.textContent = `${score}/7`;
}

let timeElement = document.getElementById("time");
let time = 0;

function startGame() {
  time = 60;
  createPills();
  draw();
  timer();
}

function timer() {
  function startTimer() {
    let timer = time;
    let minutes = 0;
    let seconds = 0;

    let countDownInterval = setInterval(function() {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      //výhra
      if (score === 7) {
        clearInterval(countDownInterval);
        endGame("win", timer);
      }

      //prohra
      if (timer == 0) {
        clearInterval(countDownInterval);
        endGame("loss");
      }

      timeElement.textContent = minutes + ":" + seconds;

      timer--;
    }, 1000);
  }

  startTimer();
}

let endElement = document.getElementById("end");
let endMessage = document.getElementById("message");

function endGame(type, winTime) {
  if (type === "win") {
    endElement.style.display = "block";
    endMessage.textContent = `Vyhráli jste! Sesbírali jste všechny vitamíny za ${time -
      winTime} sekund.`;
  }

  if (type === "loss") {
    endElement.style.display = "block";
    endMessage.textContent = `Prohráli jste! Nestihli jste sesbírat všechny vitamíny. Zkuste to znovu.`;
  }
}

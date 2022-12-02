
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const roadImg = new Image();
roadImg.src = "./images/road.png";

const carImg = new Image();
carImg.src = "./images/car.png";

const currentObstacles = [];

const road = {
  img: roadImg,
  x: 0,
  y: 0,
  width: 500,
  height: 700,
  speed: 1,

  // move: function () {
  //   this.y += this.speed;
  //   this.y %= canvas.height;
  // },

  draw: function () {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

  },
};

const car = {
  img: carImg,
  x: 200,
  y: 480,
  width: 100,
  height: 200,

  draw: function () {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  },

  moveLeft: function () {
    if (this.x === 0) {
      return;
    }
    this.x -= 10;
  },

  moveRight: function () {
    if (this.x === canvas.width - this.width) {
      return;
    }
    this.x += 10;
  },
};

const obstacles = {
  x: 0,
  y: 0,
  width: 0,
  height: 10,
  frames: 0,

  draw: function () {
    for (i = 0; i < currentObstacles.length; i++) {
      currentObstacles[i].x += -1;
      currentObstacles[i].updateCanvas();
    }
    this.frames += 1;
    if (this.frames % 120 === 0) {
    let minWidth = 40;
    let maxWidth = 300;
    this.width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
    this.x = Math.floor(Math.random() * (canvas.width - maxWidth));
    console.log(this.width);
    console.log('x', this.x)
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  },
};

function startGame() {
  road.draw();
  car.draw();
  obstacles.draw()
  const intervalId = setInterval(updateCanvas, 20);
}

function updateCanvas() {
  ctx.clearRect(0, 0, road.width, road.height);
  road.draw();
  car.draw();
  obstacles.draw()
}


window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
};

document.addEventListener("keydown", (e) => {
  console.log(e.key);
  switch (e.key) {
    case "ArrowLeft":
      car.moveLeft();
      break;
    case "ArrowRight":
      car.moveRight();
      break;
  }
  updateCanvas();
});

const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const shakeBtn = document.querySelector("button");
const content = document.querySelector(".content");
const submitBtn = document.querySelector(".submitBtn");

//Start the drawing

const { width, height } = canvas;
const MOVE_AMT = 40;
let hue = 0;
ctx.strokeStyle = `hsl(${hue},100%,50%)`;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.linejoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 10;

ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

//Draw function

const draw = (options) => {
  let { key } = options;
  hue += 20;
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  console.log(key);
  ctx.beginPath();
  ctx.moveTo(x, y);
  switch (key) {
    case "ArrowUp":
      y -= MOVE_AMT;
      break;
    case "ArrowDown":
      y += MOVE_AMT;
      break;
    case "ArrowRight":
      x += MOVE_AMT;
      break;
    case "ArrowLeft":
      x -= MOVE_AMT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
};

//handle Key
const handleKey = (e) => {
  if (e.key.includes("Arrow")) {
    e.preventDefault();
    console.log(e.key);
    draw({ key: e.key });
  }
};

const shakeCanvas = () => {
  canvas.classList.add("shake");
  canvas.addEventListener("animationend", () => {
    console.log("done shaking");
    canvas.classList.remove("shake");
  });
  ctx.clearRect(0, 0, width, height);
};

window.addEventListener("keyup", handleKey);

shakeBtn.addEventListener("click", shakeCanvas);

const obCallBack = (payload) => {
  console.log(payload);
  if (payload[0].intersectionRatio === 1) {
    submitBtn.disabled = false;
    ob.unobserve(content.lastElementChild);
  }
};

const ob = new IntersectionObserver(obCallBack, {
  root: content,
  threshold: 1,
});

ob.observe(content.lastElementChild);

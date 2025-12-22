function start() {
  document.getElementById("start").style.display = "none";
  document.getElementById("main").classList.remove("hidden");
  document.getElementById("bgm").play();
  setInterval(createHeart, 300);
  setInterval(createFlower, 1200);
}
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(heart);
  setTimeout(() => {
    heart.remove();
  }, 5000);
}
function createFlower() {
  const flower = document.createElement("div");
  flower.className = "flower";
  flower.innerHTML = "🌸";
  flower.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(flower);
  setTimeout(() => {
    flower.remove();
  }, 6000);
}
function start() {
  document.getElementById("start").style.display = "none";
  document.getElementById("main").classList.remove("hidden");
  document.getElementById("bgm").play();
  setInterval(createHeart, 300);
  setTimeout(showQuestion, 2000);
}
function showQuestion() {
  document.getElementById("questionBox").classList.remove("hidden");
}
function sayNo() {
  const box = document.getElementById("questionBox");
  const wrong = document.getElementById("wrong");
  const bgm = document.getElementById("bgm");
  const noSound = document.getElementById("noSound");
  bgm.pause();
  noSound.currentTime = 0;
  noSound.play();
  box.style.animation = "shake 0.4s";
  setTimeout(() => box.style.animation = "", 400);
  wrong.classList.remove("hidden");
  setTimeout(() => {
    wrong.classList.add("hidden");
  }, 1000);
  noSound.onended = () => {
    bgm.play();
  };
}
function sayYes() {
  const btn = document.getElementById("yesBtn");
  for (let i = 0; i < 15; i++) {
    createLove(btn);
  }
  const ans = document.getElementById("answer");
  ans.innerHTML = "Aww 💖 I knew it 😘🌹 I lalu ani Mimi.";
  ans.classList.remove("hidden");
  document.getElementById("lovePhoto").classList.remove("hidden");
  document.getElementById("main").classList.add("hidden");
}
function createLove(button) {
  const love = document.createElement("div");
  love.className = "love";
  love.innerHTML = "💖";
  const rect = button.getBoundingClientRect();
  love.style.left = rect.left + rect.width / 2 + "px";
  love.style.top = rect.top + "px";
  document.body.appendChild(love);
  setTimeout(() => {
    love.remove();
  }, 2000);
}
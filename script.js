let heartIntervalId = null;
let flowerIntervalId = null;
let noSoundEndedHandler = null;

function start() {
  const startBtn = document.getElementById("start");
  const main = document.getElementById("main");
  const bgm = document.getElementById("bgm");

  if (startBtn) startBtn.style.display = "none";
  if (main) main.classList.remove("hidden");

  if (bgm) {
    bgm.play().catch(() => { /* autoplay blocked — will play on user interaction */ });
  }

  // clear existing intervals if start() called multiple times
  if (heartIntervalId) clearInterval(heartIntervalId);
  if (flowerIntervalId) clearInterval(flowerIntervalId);

  heartIntervalId = setInterval(createHeart, 300);
  flowerIntervalId = setInterval(createFlower, 1200);
  setTimeout(showQuestion, 2000);
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤️";

  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.top = "90vh";
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "9999";

  document.body.appendChild(heart);
  setTimeout(() => {
    if (heart.parentNode) heart.remove();
  }, 5000);
}

function createFlower() {
  const flower = document.createElement("div");
  flower.className = "flower";
  flower.textContent = "🌸";

  flower.style.position = "fixed";
  flower.style.left = Math.random() * 100 + "vw";
  flower.style.top = Math.random() * 60 + "vh";
  flower.style.pointerEvents = "none";
  flower.style.zIndex = "9999";

  document.body.appendChild(flower);
  setTimeout(() => {
    if (flower.parentNode) flower.remove();
  }, 6000);
}

function showQuestion() {
  const qb = document.getElementById("questionBox");
  if (qb) qb.classList.remove("hidden");
}

function sayNo() {
  const box = document.getElementById("questionBox");
  const wrong = document.getElementById("wrong");
  const bgm = document.getElementById("bgm");
  const noSound = document.getElementById("noSound");

  if (bgm && !bgm.paused) bgm.pause();

  if (noSound) {
    noSound.currentTime = 0;
    noSound.play().catch(() => { /* play blocked */ });

    if (noSoundEndedHandler) noSound.removeEventListener("ended", noSoundEndedHandler);
    noSoundEndedHandler = () => {
      if (bgm) bgm.play().catch(() => {});
    };
    noSound.addEventListener("ended", noSoundEndedHandler);
  }

  if (box) {
    box.style.animation = "shake 0.4s";
    setTimeout(() => { if (box) box.style.animation = ""; }, 400);
  }

  if (wrong) {
    wrong.classList.remove("hidden");
    setTimeout(() => { if (wrong) wrong.classList.add("hidden"); }, 1000);
  }
}
function sayYes() {
  const btn = document.getElementById("yesBtn");
  if (btn) {
    for (let i = 0; i < 15; i++) {
      createLove(btn);
    }
  }
  const ans = document.getElementById("answer");
  if (ans) {
    ans.innerHTML = "Aww 💖 I knew it 😘🌹 I lalu ani Mimi.";
    // make sure the message is visible above overlays/animations
    ans.classList.remove("hidden");
    ans.style.position = "fixed";      // keep it visible even if other elements flow
    ans.style.top = "10%";            // adjust as needed
    ans.style.left = "50%";
    ans.style.transform = "translateX(-50%)";
    ans.style.zIndex = "10001";       // higher than floating hearts/flowers
    ans.style.pointerEvents = "auto"; // allow interactions if any
  }
  const photo = document.getElementById("photoScreen");
  if (photo) {
    // make sure photo is behind the message (lower z-index)
    photo.style.zIndex = "10000";
    photo.classList.remove("hidden");
  }
}
  const ans = document.getElementById("answer");
  if (ans) {
    ans.textContent = "Aww 💖 I knew it 😘🌹 I lalu ani Mimi.";
    ans.classList.remove("hidden");
  }
  const photo = document.getElementById("photoScreen");
  if (photo) photo.classList.remove("hidden");
}
function createLove(button) {
  const love = document.createElement("div");
  love.className = "love";
  love.textContent = "💖";

  const rect = button ? button.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 0 };
  love.style.position = "fixed";
  love.style.left = rect.left + rect.width / 2 + "px";
  love.style.top = rect.top + "px";
  love.style.pointerEvents = "none";
  love.style.zIndex = "9999";

  document.body.appendChild(love);
  setTimeout(() => {
    if (love.parentNode) love.remove();
  }, 2000);
}
function stopEffects() {
  if (heartIntervalId) {
    clearInterval(heartIntervalId);
    heartIntervalId = null;
  }
  if (flowerIntervalId) {
    clearInterval(flowerIntervalId);
    flowerIntervalId = null;
  }
  if (noSoundEndedHandler) {
    const noSound = document.getElementById("noSound");
    if (noSound) noSound.removeEventListener("ended", noSoundEndedHandler);
    noSoundEndedHandler = null;
  }
}
window.addEventListener('beforeunload', stopEffects);

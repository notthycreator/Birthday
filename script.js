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
  if (heartIntervalId !== null) {
    clearInterval(heartIntervalId);
    heartIntervalId = null;
  }
  if (flowerIntervalId !== null) {
    clearInterval(flowerIntervalId);
    flowerIntervalId = null;
  }

  heartIntervalId = setInterval(createHeart, 300);
  flowerIntervalId = setInterval(createFlower, 1200);
  setTimeout(showQuestion, 2000);
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤️";

  heart.style.position = "fixed";
  heart.style.left = (Math.random() * 90 + 5) + "vw"; // 5vw..95vw to avoid clipping
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
  flower.style.left = (Math.random() * 90 + 5) + "vw"; // 5vw..95vw
  flower.style.top = (Math.random() * 60) + "vh";
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
  // stop ongoing effects so the page doesn't keep spawning things after acceptance
  stopEffects();

  const btn = document.getElementById("yesBtn");
  if (btn) {
    for (let i = 0; i < 15; i++) {
      createLove(btn);
    }
  }

  const ans = document.getElementById("answer");
  if (ans) {
    ans.textContent = "Aww 💖 I knew it 😘🌹 I lalu ani Mimi."; // check wording if desired
    // make sure the message is visible above overlays/animations
    ans.classList.remove("hidden");
    ans.style.position = "fixed";
    ans.style.top = "10%";
    ans.style.left = "50%";
    ans.style.transform = "translateX(-50%)";
    ans.style.zIndex = "10001";
    ans.style.pointerEvents = "auto";
  }

  const photo = document.getElementById("photoScreen");
  if (photo) {
    photo.style.zIndex = "10000";
    photo.classList.remove("hidden");
  }
}

function createLove(button) {
  const love = document.createElement("div");
  love.className = "love";
  love.textContent = "💖";

  const rect = button ? button.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 0, height: 0 };
  love.style.position = "fixed";
  const leftPx = rect.left + rect.width / 2;
  const topPx = rect.top + rect.height / 2;
  love.style.left = leftPx + "px";
  love.style.top = topPx + "px";
  love.style.transform = "translate(-50%, -50%)";
  love.style.pointerEvents = "none";
  love.style.zIndex = "9999";

  document.body.appendChild(love);
  setTimeout(() => {
    if (love.parentNode) love.remove();
  }, 2000);
}

function stopEffects() {
  if (heartIntervalId !== null) {
    clearInterval(heartIntervalId);
    heartIntervalId = null;
  }
  if (flowerIntervalId !== null) {
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

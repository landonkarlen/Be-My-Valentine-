let maybeClickCount = 0;

const yesButton = document.getElementById("yesBtn");
const maybeButton = document.getElementById("maybeBtn");

const maybeTexts = [
  "I’ll think about it",
  "Are you sure?",
  "Are you REALLY sure?",
  "Like… absolutely sure?",
  "The camel is offended",
  "This is getting awkward",
  "Just say yes 😭",
  "I’m running out of patience",
  "Okay now you’re doing this on purpose",
  "LAST CHANCE"
];

// ----- MAYBE BUTTON -----
maybeButton.addEventListener("click", () => {
  maybeClickCount++;

  maybeButton.textContent =
    maybeTexts[Math.min(maybeClickCount, maybeTexts.length - 1)];

  // Grow YES button
  const scale = 1 + maybeClickCount * 0.25;
  yesButton.style.transform = `scale(${scale})`;

  // Shake maybe
  maybeButton.classList.add("shake");
  setTimeout(() => maybeButton.classList.remove("shake"), 300);

  // Panic movement
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  maybeButton.style.transform = `translate(${x}px, ${y}px)`;
});

// ----- YES BUTTON -----
yesButton.addEventListener("click", () => {
  explode();
  shakeScreen();
  spawnParticles();

  yesButton.remove();
  maybeButton.remove();

  setTimeout(() => {
    const msg = document.createElement("div");
    msg.className = "final-message";
    msg.innerHTML = "💖 YOU SAID YES 💖<br><span>The camel approves.</span>";
    document.body.appendChild(msg);
  }, 700);
});

// ----- EFFECTS -----
function explode() {
  const flash = document.createElement("div");
  flash.className = "explosion-flash";
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 600);
}

function shakeScreen() {
  document.body.classList.add("screen-shake");
  setTimeout(() => document.body.classList.remove("screen-shake"), 600);
}

function spawnParticles() {
  for (let i = 0; i < 80; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.textContent = Math.random() > 0.5 ? "❤️" : "🔥";
    p.style.left = Math.random() * window.innerWidth + "px";
    p.style.top = Math.random() * window.innerHeight + "px";
    p.style.fontSize = Math.random() * 30 + 20 + "px";
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1500);
  }
}

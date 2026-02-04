let noClickCount = 0;

const yesButton = document.getElementById("yesBtn");
const noButton = document.getElementById("noBtn");

const noTexts = [
  "I’ll think about it",
  "Are you sure?",
  "Are you REALLY sure?",
  "Like… 100% sure?",
  "This is getting suspicious",
  "Bro come on",
  "The camel is judging you",
  "This button is tired",
  "Just click yes already",
  "Okay this is dramatic",
  "Last chance 😤"
];

// --------- NO BUTTON BEHAVIOR ----------
noButton.addEventListener("click", () => {
  noClickCount++;

  // Change text
  noButton.textContent =
    noTexts[Math.min(noClickCount, noTexts.length - 1)];

  // Grow YES button
  const scale = 1 + noClickCount * 0.25;
  yesButton.style.transform = `scale(${scale})`;

  // Panic shake
  noButton.classList.add("shake");
  setTimeout(() => noButton.classList.remove("shake"), 300);

  // Make NO button move randomly
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  noButton.style.transform = `translate(${x}px, ${y}px)`;
});

// --------- YES BUTTON EXPLOSION ----------
yesButton.addEventListener("click", () => {
  triggerExplosion();
  triggerScreenShake();
  triggerParticles();

  // Remove buttons after click
  yesButton.remove();
  noButton.remove();

  // Final message
  setTimeout(() => {
    const message = document.createElement("div");
    message.innerHTML = "💖 YOU SAID YES 💖<br><span>Best decision ever.</span>";
    message.className = "final-message";
    document.body.appendChild(message);
  }, 800);
});

// --------- EXPLOSION FLASH ----------
function triggerExplosion() {
  const flash = document.createElement("div");
  flash.className = "explosion-flash";
  document.body.appendChild(flash);

  setTimeout(() => flash.remove(), 600);
}

// --------- SCREEN SHAKE ----------
function triggerScreenShake() {
  document.body.classList.add("screen-shake");
  setTimeout(() => {
    document.body.classList.remove("screen-shake");
  }, 600);
}

// --------- PARTICLES ----------
function triggerParticles() {
  for (let i = 0; i < 80; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.textContent = Math.random() > 0.5 ? "❤️" : "🔥";

    particle.style.left = Math.random() * window.innerWidth + "px";
    particle.style.top = Math.random() * window.innerHeight + "px";
    particle.style.fontSize = Math.random() * 30 + 20 + "px";

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 1500);
  }
}

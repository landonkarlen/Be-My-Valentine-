const yesBtn = document.getElementById("yesBtn");
const maybeBtn = document.getElementById("maybeBtn");

let clickCount = 0;

const maybeTexts = [
  "Are you sure?",
  "Are you REALLY sure?",
  "Are you sure you're sure?",
  "This feels like a yes.",
  "The camel is getting nervous.",
  "The camel is judging you.",
  "This button is losing confidence.",
  "Please stop clicking me.",
  "Okay now I’m scared.",
  "There is only one answer."
];

// Sounds
const boomSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-explosion-impact-1708.mp3");
const panicSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-cartoon-voice-laugh-343.mp3");

// Inject animation styles (self-contained, no CSS file needed)
const style = document.createElement("style");
style.innerHTML = `
@keyframes explode {
  from { transform: scale(0); opacity: 1; }
  to { transform: scale(20); opacity: 0; }
}

@keyframes shockwave {
  from { transform: scale(0.2); opacity: 0.8; }
  to { transform: scale(6); opacity: 0; }
}

@keyframes fall {
  to { transform: translateY(120vh) rotate(360deg); opacity: 0; }
}

@keyframes screenShake {
  0% { transform: translate(0,0); }
  25% { transform: translate(-10px,10px); }
  50% { transform: translate(10px,-10px); }
  75% { transform: translate(-10px,-10px); }
  100% { transform: translate(0,0); }
}
`;
document.head.appendChild(style);

// MAYBE button logic
maybeBtn.addEventListener("click", () => {
  clickCount++;

  const scale = 1 + clickCount * 0.18;
  yesBtn.style.transform = `scale(${scale})`;

  if (scale > 3) {
    yesBtn.style.width = "90vw";
    yesBtn.style.height = "20vh";
    yesBtn.style.fontSize = "2.5rem";
  }

  panicSound.currentTime = 0;
  panicSound.play();

  const textIndex = Math.min(clickCount - 1, maybeTexts.length - 1);
  maybeBtn.textContent = maybeTexts[textIndex];
});

// YES BUTTON = ABSOLUTE CHAOS
yesBtn.addEventListener("click", () => {
  boomSound.currentTime = 0;
  boomSound.play();

  document.body.style.animation = "screenShake 0.6s";

  const rect = yesBtn.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Core explosion
  const explosion = document.createElement("div");
  explosion.style.position = "fixed";
  explosion.style.left = `${centerX}px`;
  explosion.style.top = `${centerY}px`;
  explosion.style.width = "40px";
  explosion.style.height = "40px";
  explosion.style.background = "radial-gradient(circle, #fff, #ff4d6d, #c9184a)";
  explosion.style.borderRadius = "50%";
  explosion.style.transform = "translate(-50%, -50%)";
  explosion.style.animation = "explode 0.8s ease-out forwards";
  explosion.style.zIndex = "9999";
  document.body.appendChild(explosion);

  // Shockwaves
  for (let i = 0; i < 3; i++) {
    const ring = document.createElement("div");
    ring.style.position = "fixed";
    ring.style.left = `${centerX}px`;
    ring.style.top = `${centerY}px`;
    ring.style.width = "60px";
    ring.style.height = "60px";
    ring.style.border = "4px solid rgba(255,77,109,0.8)";
    ring.style.borderRadius = "50%";
    ring.style.transform = "translate(-50%, -50%)";
    ring.style.animation = `shockwave 1.2s ease-out ${i * 0.15}s forwards`;
    ring.style.zIndex = "9998";
    document.body.appendChild(ring);
  }

  // Heart confetti
  for (let i = 0; i < 40; i++) {
    const heart = document.createElement("div");
    heart.textContent = "💖";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-5vh";
    heart.style.fontSize = Math.random() * 20 + 20 + "px";
    heart.style.animation = `fall ${Math.random() * 2 + 2}s linear forwards`;
    heart.style.zIndex = "9997";
    document.body.appendChild(heart);
  }

  // Finale screen
  setTimeout(() => {
    document.body.innerHTML = `
      <div style="
        height:100vh;
        background:radial-gradient(circle,#ff4d6d,#c9184a);
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        color:white;
        font-family:Arial;
        text-align:center;
        padding:40px;
      ">
        <img src="camel.png" style="width:260px;margin-bottom:30px;" />
        <h1 style="font-size:3rem;">
          💘 YOU CHOSE CORRECTLY 💘
        </h1>
        <p style="font-size:1.4rem;">
          The camel descends.<br>
          Love has been confirmed.
        </p>
      </div>
    `;
  }, 1100);
});

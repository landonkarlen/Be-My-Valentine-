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
const boomSound = new Audio(
  "https://assets.mixkit.co/sfx/preview/mixkit-explosion-impact-1708.mp3"
);
const panicSound = new Audio(
  "https://assets.mixkit.co/sfx/preview/mixkit-cartoon-voice-laugh-343.mp3"
);

// MAYBE button behavior
maybeBtn.addEventListener("click", () => {
  clickCount++;

  // YES button grows
  const scale = 1 + clickCount * 0.18;
  yesBtn.style.transform = `scale(${scale})`;

  if (scale > 3) {
    yesBtn.style.width = "90vw";
    yesBtn.style.height = "20vh";
    yesBtn.style.fontSize = "2.5rem";
  }

  // Panic animation
  maybeBtn.classList.add("shake");
  panicSound.currentTime = 0;
  panicSound.play();

  setTimeout(() => {
    maybeBtn.classList.remove("shake");
  }, 400);

  // Change text
  const textIndex = Math.min(clickCount - 1, maybeTexts.length - 1);
  maybeBtn.textContent = maybeTexts[textIndex];
});

// YES button = EXPLOSION
yesBtn.addEventListener("click", () => {
  boomSound.play();

  // Screen shake
  document.body.classList.add("shake-screen");

  // Explosion element
  const explosion = document.createElement("div");
  explosion.className = "explosion";
  document.body.appendChild(explosion);

  // After explosion, show finale
  setTimeout(() => {
    document.body.innerHTML = `
      <div style="
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: radial-gradient(circle, #ff4d6d, #c9184a);
        color: white;
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 40px;
      ">
        <h1 style="font-size: 3rem;">
          💘 BOOM 💘<br><br>
          You chose correctly.<br>
          The camel is VERY proud.
        </h1>
      </div>
    `;
  }, 900);
});



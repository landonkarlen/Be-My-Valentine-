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

// Sound effects
const popSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-bubble-pop-up-alert-notification-2357.mp3");
const panicSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-cartoon-voice-laugh-343.mp3");

maybeBtn.addEventListener("click", () => {
  clickCount++;

  // YES button grows
  const scale = 1 + clickCount * 0.18;
  yesBtn.style.transform = `scale(${scale})`;

  // MAYBE button panics
  maybeBtn.classList.add("shake");
  panicSound.currentTime = 0;
  panicSound.play();

  setTimeout(() => {
    maybeBtn.classList.remove("shake");
  }, 400);

  // Text changes
  const textIndex = Math.min(clickCount - 1, maybeTexts.length - 1);
  maybeBtn.textContent = maybeTexts[textIndex];
});

yesBtn.addEventListener("click", () => {
  popSound.play();

  document.body.innerHTML = `
    <div style="
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: radial-gradient(circle, #ff4d6d, #c9184a);
      color: white;
      font-family: Arial;
      text-align: center;
      padding: 40px;
    ">
      <h1 style="font-size: 3rem;">
        💘 EXCELLENT CHOICE 💘<br><br>
        The camel knew all along.
      </h1>
    </div>
  `;
});


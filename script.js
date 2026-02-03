const yesBtn = document.getElementById("yesBtn");
const maybeBtn = document.getElementById("maybeBtn");

let clickCount = 0;

const maybeTexts = [
  "Are you sure?",
  "Are you *sure* you're sure?",
  "Think harder.",
  "This feels like a yes.",
  "The camel believes in us.",
  "You're running out of options.",
  "This button is losing confidence.",
  "Just click YES already.",
  "Okay now you're just being silly."
];

maybeBtn.addEventListener("click", () => {
  clickCount++;

  // Grow YES button
  const scale = 1 + clickCount * 0.15;
  yesBtn.style.transform = `scale(${scale})`;

  // Change maybe button text
  const textIndex = Math.min(clickCount - 1, maybeTexts.length - 1);
  maybeBtn.textContent = maybeTexts[textIndex];
});

yesBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <div style="
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ff4d6d;
      color: white;
      font-family: Arial;
      text-align: center;
      padding: 40px;
    ">
      <h1>💘 Excellent choice 💘<br>The camel is proud.</h1>
    </div>
  `;
});

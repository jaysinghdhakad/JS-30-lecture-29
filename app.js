let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTime(seconds);
  displayEndTimes(then);
  console.log(now, then);
  countdown = setInterval(() => {
    const sec = Math.round((then - Date.now()) / 1000);
    if (sec < 0) {
      clearInterval(countdown);
      return;
    }
    const secondsLeft = Math.abs(sec);
    displayTime(secondsLeft);
  }, 1000);
}
function displayTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
}
function displayEndTimes(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  endTime.textContent = `Be Back At ${adjustedHour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}
function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}
buttons.forEach((button) => {
  button.addEventListener("click", startTimer);
});
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = parseInt(this.minutes.value);
  timer(mins * 60);
  this.reset();
});

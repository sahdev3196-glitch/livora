// Dynamic Countdown Timer
(function initCountdown() {
  // Set launch target date to 14 days from now
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 14);

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
})();

// Interactive Email Subscription Toast Handling
const notifyForm = document.getElementById('notify-form');
const emailInput = document.getElementById('email-input');
const toast = document.getElementById('toast');

if (notifyForm) {
  notifyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (emailInput && emailInput.value.trim() !== '') {
      toast.classList.add('active');
      emailInput.value = '';
      setTimeout(() => {
        toast.classList.remove('active');
      }, 5000);
    }
  });
}

// Mouse subtle glow tracking effect
document.addEventListener('mousemove', (e) => {
  const glow3 = document.querySelector('.bg-glow-3');
  if (glow3) {
    const x = e.clientX;
    const y = e.clientY;
    glow3.style.left = `${x}px`;
    glow3.style.top = `${y}px`;
  }
});

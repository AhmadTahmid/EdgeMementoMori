document.addEventListener('DOMContentLoaded', () => {
    const targetDate = new Date("2066-01-03T00:00:00").getTime();

    const els = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(interval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        els.days.innerText = days.toString().padStart(5, '0');
        els.hours.innerText = hours.toString().padStart(2, '0');
        els.minutes.innerText = minutes.toString().padStart(2, '0');
        els.seconds.innerText = seconds.toString().padStart(2, '0');
    }

    const interval = setInterval(updateTimer, 1000);
    updateTimer();

    const btn = document.getElementById('acknowledge-btn');
    const urlParams = new URLSearchParams(window.location.search);
    const targetUrl = urlParams.get('target');

    if (targetUrl) {
        btn.addEventListener('click', () => {
            window.location.href = targetUrl;
        });
    } else {
        btn.addEventListener('click', () => {
            window.location.href = "https://www.google.com";
        });
    }
});

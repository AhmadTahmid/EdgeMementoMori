document.addEventListener('DOMContentLoaded', () => {
    // Target Date: 40 years from "today" (Jan 3, 2026 -> Jan 3, 2066)
    const targetDate = new Date("2066-01-03T00:00:00").getTime();

    // DOM Elements
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

        // Calculations: Total Days (Total milliseconds / ms per day)
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update DOM
        els.days.innerText = days.toString().padStart(5, '0'); // Pad for larger numbers (e.g., 14000)
        els.hours.innerText = hours.toString().padStart(2, '0');
        els.minutes.innerText = minutes.toString().padStart(2, '0');
        els.seconds.innerText = seconds.toString().padStart(2, '0');
    }

    const interval = setInterval(updateTimer, 1000);
    updateTimer(); // Initial call

    // Acknowledge Button - Close the window
    // Carpe Diem Button
    const btn = document.getElementById('acknowledge-btn');

    // Check if there is a target URL in the query string
    const urlParams = new URLSearchParams(window.location.search);
    const targetUrl = urlParams.get('target');

    if (targetUrl) {
        // If we are intercepting a specific link, maybe show a tooltip or just be ready to go there.
        // For now, we just redirect on click.
        btn.addEventListener('click', () => {
            window.location.href = targetUrl;
        });
    } else {
        // Default behavior (New Tab): Go to Google
        btn.addEventListener('click', () => {
            window.location.href = "https://www.google.com";
        });
    }
});

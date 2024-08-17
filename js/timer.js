let countdownInterval;
let notificationInterval;

function startCountdown(duration) {
    const endTime = Date.now() + duration * 1000;

    function updateDisplay() {
        const remainingTime = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
        document.getElementById('timerDisplay').textContent = `Time remaining: ${remainingTime}s`;

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            displayNotification('Timer has expired!');
        }
    }

    countdownInterval = setInterval(updateDisplay, 1000);
    updateDisplay();
}

function displayNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';

    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);

    // Repeat notification every 5 seconds
    notificationInterval = setInterval(() => {
        notification.textContent = 'Repeating notification.';
        notification.style.display = 'block';
    }, 5000);
}

document.getElementById('startTimer').addEventListener('click', () => {
    const duration = parseInt(document.getElementById('duration').value, 10);
    if (isNaN(duration) || duration <= 0) {
        alert('Please enter a valid duration.');
        return;
    }

    startCountdown(duration);
});

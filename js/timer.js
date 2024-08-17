document.addEventListener('DOMContentLoaded', () => {
    let countdownInterval;
    let notificationInterval;

    // Function to update the timer display
    function updateTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        document.getElementById('timerDisplay').textContent =
            `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    // Function to start the countdown timer
    function startCountdownTimer(duration) {
        let remainingTime = duration;
        updateTimerDisplay(remainingTime);

        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        countdownInterval = setInterval(() => {
            remainingTime--;
            updateTimerDisplay(remainingTime);

            if (remainingTime <= 0) {
                clearInterval(countdownInterval);
                document.getElementById('timerDisplay').textContent = 'Time\'s up!';
                // Optional: Trigger notification when the timer ends
                alert('Timer has ended!');
            }
        }, 1000);
    }

    // Event listener for start timer button
    document.getElementById('startTimerButton').addEventListener('click', () => {
        const inputSeconds = parseInt(document.getElementById('timerInput').value, 10);
        if (!isNaN(inputSeconds) && inputSeconds > 0) {
            startCountdownTimer(inputSeconds);
        } else {
            alert('Please enter a valid number of seconds.');
        }
    });

    // Function to show notification after delay
    function showNotificationAfterDelay(delay) {
        setTimeout(() => {
            document.getElementById('notificationDisplay').textContent = 'This is a delayed notification!';
        }, delay);
    }

    // Function to start repeating notifications
    function startRepeatingNotifications(interval) {
        if (notificationInterval) {
            clearInterval(notificationInterval);
        }

        notificationInterval = setInterval(() => {
            document.getElementById('notificationDisplay').textContent = 'Repeating notification!';
        }, interval);
    }

    // Event listener for start notification button
    document.getElementById('startNotificationButton').addEventListener('click', () => {
        const delay = parseInt(document.getElementById('notificationDelayInput').value, 10);
        if (!isNaN(delay) && delay > 0) {
            showNotificationAfterDelay(delay);
            startRepeatingNotifications(delay);
        } else {
            alert('Please enter a valid delay in milliseconds.');
        }
    });

    // Event listener for stop notification button
    document.getElementById('stopNotificationButton').addEventListener('click', () => {
        if (notificationInterval) {
            clearInterval(notificationInterval);
            notificationInterval = null;
            document.getElementById('notificationDisplay').textContent = '';
        }
    });
});

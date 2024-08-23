import exercises from './exercises.js';
import dailyExerciseMap from './dailyExerciseMap.js';

let targetExercise = '';
let guessCount = 0;
const maxGuesses = 8;
let availableExercises = [...Object.keys(exercises)];
let startTime;
let timerInterval;
let isAnimating = false;
let isOneTimeLimit = true; // One Time Limit
let hasCompletedToday = false;
let initialPadding = 200;
let paddingIncrement = 100;
const guessedExercises = new Set();
let guessHistory = [];

function saveGuessHistory() {
    localStorage.setItem('repdle-guess-history', JSON.stringify(guessHistory));
    localStorage.setItem('repdle-available-exercises', JSON.stringify(availableExercises));
    localStorage.setItem('repdle-last-played-date', new Date().toDateString());
}

function loadGuessHistory() {
    const savedHistory = localStorage.getItem('repdle-guess-history');
    if (savedHistory) {
        guessHistory = JSON.parse(savedHistory);
        guessCount = guessHistory.length;
        guessedExercises.clear();
        guessHistory.forEach(guess => guessedExercises.add(guess.toLowerCase()));
    }

    const savedAvailableExercises = localStorage.getItem('repdle-available-exercises');
    if (savedAvailableExercises) {
        availableExercises = JSON.parse(savedAvailableExercises);
    } else {
        availableExercises = availableExercises.filter(exercise => !guessedExercises.has(exercise.toLowerCase()));
    }

    hasCompletedToday = localStorage.getItem('repdle-completion-state') === 'completed';
}

function clearGuessHistory() {
    guessHistory = [];
    guessedExercises.clear();
    guessCount = 0;
    availableExercises = [...Object.keys(exercises)];
    localStorage.removeItem('repdle-guess-history');
    localStorage.removeItem('repdle-available-exercises');
    localStorage.removeItem('repdle-last-played-date');
    localStorage.removeItem('repdle-start-time');
}

function getDailyExercise() {
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    const storedDate = localStorage.getItem('repdle-exercise-date');
    if (storedDate === dateString && localStorage.getItem('repdle-daily-exercise')) {
        return localStorage.getItem('repdle-daily-exercise');
    }

    const dailyExercise = dailyExerciseMap[dateString] || null;
    if (dailyExercise) {
        localStorage.setItem('repdle-daily-exercise', dailyExercise);
        localStorage.setItem('repdle-exercise-date', dateString);
    }

    return dailyExercise;
}

function displayTodayDate() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;

    const dateElement = document.getElementById('today-date');
    if (dateElement) {
        dateElement.textContent = formattedDate;
    }
}

function checkDailyAttempt() {
    const today = new Date().toDateString();
    const lastAttemptDate = localStorage.getItem('repdle-last-attempt');
    const lastCompletionState = localStorage.getItem('repdle-completion-state');
    const completedExercise = localStorage.getItem('repdle-completed-exercise');
    const completionTime = localStorage.getItem('repdle-completion-time');
    const wasSuccessful = localStorage.getItem('repdle-was-successful');

    if (lastAttemptDate !== today) {
        clearGuessHistory();
        localStorage.setItem('repdle-last-attempt', today);
        localStorage.setItem('repdle-completion-state', 'incomplete');
        localStorage.removeItem('repdle-completed-exercise');
        localStorage.removeItem('repdle-completion-time');
        localStorage.removeItem('repdle-was-successful');
        hasCompletedToday = false;
        return false;
    }

    if (lastCompletionState === 'completed') {
        hasCompletedToday = true;
        targetExercise = completedExercise || 'Unknown Exercise';
        loadGuessHistory();
        showCompletedState(completionTime, wasSuccessful === 'true');
    } else {
        loadGuessHistory();
    }
    return hasCompletedToday;
}

function showCompletedState(completionTime, wasSuccessful) {
    disableInput();
    const message = wasSuccessful
        ? "You've already completed today's puzzle!"
        : "You've already attempted today's puzzle. Better luck tomorrow!";
    const messageType = wasSuccessful ? 'success' : 'failure';
    displayMessage(message, messageType, completionTime);
    if (wasSuccessful) {
        triggerSuccessConfetti();
    }
    displayGuessHistory();

    const persistentMessage = document.createElement('div');
    persistentMessage.className = `message ${messageType} persistent`;
    persistentMessage.innerHTML = `
        <div class="content">${message}</div>
        <div class="timer">Your time: ${formatTime(completionTime).formattedTime}${formatTime(completionTime).emoji}</div>
    `;

    const guessesContainer = document.getElementById('guesses-container');
    guessesContainer.parentNode.insertBefore(persistentMessage, guessesContainer.nextSibling);
}

function markPuzzleCompleted(wasSuccessful) {
    const completionTime = Math.floor((new Date() - startTime) / 1000);
    localStorage.setItem('repdle-completion-state', 'completed');
    localStorage.setItem('repdle-completed-exercise', targetExercise);
    localStorage.setItem('repdle-completion-time', completionTime);
    localStorage.setItem('repdle-was-successful', wasSuccessful);
    hasCompletedToday = true;
    return completionTime;
}

function displayGuessHistory() {
    const guessesContainer = document.getElementById('guesses-container');
    guessesContainer.innerHTML = '';

    guessHistory.forEach(guess => {
        const guessRow = createGuessRow(guess);
        guessesContainer.appendChild(guessRow);
        animateReveal(guessRow, guess, true);
    });

    updateRepsCounter(maxGuesses - guessCount);
}

function createGuessRow(guess) {
    const guessRow = document.createElement('div');
    guessRow.className = 'guess-row';

    const exerciseGuess = document.createElement('div');
    exerciseGuess.className = 'guess-item exercise-guess';
    exerciseGuess.innerHTML = '<span class="hidden-text">' + guess + '</span>';
    guessRow.appendChild(exerciseGuess);

    const categories = ['Equipment Used', 'MAIN Muscle Group', 'Isolation or Compound', 'Popularity', 'Motion 💵'];
    categories.forEach(category => {
        const guessItem = document.createElement('div');
        guessItem.className = 'guess-item';
        guessItem.innerHTML = '<span class="hidden-text">' + exercises[guess][category] + '</span>';
        guessRow.appendChild(guessItem);
    });

    return guessRow;
}

function triggerSuccessConfetti() {
    const duration = 0.8 * 1000;
    const animationEnd = Date.now() + duration;

    (function frame() {
        const submitButton = document.getElementById('submit-btn');
        const rect = submitButton.getBoundingClientRect();
        const x = (rect.left + rect.right) / 2 / window.innerWidth;
        const y = submitButton.offsetTop / window.innerHeight;

        confetti({
            particleCount: 17,
            angle: 270,
            spread: 180,
            origin: { x: 0, y }
        });
        confetti({
            particleCount: 17,
            angle: 270,
            spread: 180,
            origin: { x: 0.5, y }
        });
        confetti({
            particleCount: 17,
            angle: 270,
            spread: 180,
            origin: { x: 1, y }
        });

        if (Date.now() < animationEnd) {
            requestAnimationFrame(frame);
        }
    }());
}

function getHourlyPlayerCount() {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const hoursPassed = Math.floor((now - startOfDay) / (1000 * 60 * 60));

    const dateSeed = getDateSeed();
    const seed = dateSeed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const baseCount = Math.floor(seededRandom(seed) * 50) + 1;

    let playerCount = baseCount;
    for (let i = 0; i < hoursPassed; i++) {
        playerCount += Math.floor(seededRandom(seed + i + 1) * 50) + 1;
    }

    return Math.min(playerCount, 999);
}

function getDateSeed() {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

function seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}


function initGame() {
    updatePlayerCount();
    if (isOneTimeLimit && checkDailyAttempt()) {
        return;
    }

    targetExercise = getDailyExercise();

    if (!targetExercise) {
        displayMessage('No daily exercise found. Please check back tomorrow.', 'failure');
        return;
    }

    loadGuessHistory();

    const savedStartTime = localStorage.getItem('repdle-start-time');
    if (savedStartTime) {
        const savedDate = new Date(savedStartTime);
        const today = new Date();
        if (savedDate.toDateString() === today.toDateString()) {
            startTime = savedDate;
            startTimer();
        } else {
            localStorage.removeItem('repdle-start-time');
        }
    }

    if (guessHistory.includes(targetExercise) && !hasCompletedToday) {
        const elapsedTime = Math.floor((new Date() - startTime) / 1000);
        setTimeout(() => {
            displayMessage('Congratulations! You have guessed correctly!', 'success', elapsedTime);
            triggerSuccessConfetti();
        }, 100);
        disableInput();
        clearInterval(timerInterval);
        if (isOneTimeLimit) {
            markPuzzleCompleted(true);
        }
        hasCompletedToday = true;
    }

    updateRepsCounter(maxGuesses - guessCount);

    const totalPadding = initialPadding + (guessHistory.length * paddingIncrement);
    document.body.style.paddingBottom = `${totalPadding}px`;

    document.getElementById('guesses-container').innerHTML = '';
    document.getElementById('exercise-input').value = '';
    document.getElementById('exercise-input').disabled = hasCompletedToday;
    document.getElementById('submit-btn').disabled = hasCompletedToday;

    displayGuessHistory();

    autocomplete(document.getElementById("exercise-input"), availableExercises);
}

function updatePlayerCount() {
    const playerCount = getHourlyPlayerCount();
    const playerCountElement = document.getElementById('player-count');
    if (playerCountElement) {
        playerCountElement.textContent = `${playerCount} people already found out!`;
    }
}

function updateRepsCounter(repsLeft) {
    const repsCounter = document.getElementById('reps-counter');
    repsCounter.textContent = `${repsLeft} reps`;

    if (repsLeft <= 3) {
        repsCounter.classList.add('low');
    } else {
        repsCounter.classList.remove('low');
    }
}

function startTimer() {
    if (!startTime) {
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function updateTimer() {
    if (!startTime) return;

    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

function handleGuess() {
    if (isAnimating || (isOneTimeLimit && hasCompletedToday)) return;

    const input = document.getElementById('exercise-input');
    const guess = input.value.trim();

    const matchedExercise = Object.keys(exercises).find(
        exercise => exercise.toLowerCase() === guess.toLowerCase()
    );

    if (!matchedExercise || guessedExercises.has(matchedExercise.toLowerCase())) return;

    guessedExercises.add(matchedExercise.toLowerCase());
    guessHistory.push(matchedExercise);

    availableExercises = availableExercises.filter(exercise => exercise.toLowerCase() !== guess.toLowerCase());
    saveGuessHistory();
    autocomplete(document.getElementById("exercise-input"), availableExercises);

    if (!startTime) {
        startTime = new Date();
        localStorage.setItem('repdle-start-time', startTime.toISOString());
        startTimer();
    }

    const submitButton = document.getElementById('submit-btn');
    const rect = submitButton.getBoundingClientRect();
    const x = (rect.left + rect.right) / 2 / window.innerWidth;
    const y = (rect.top + rect.bottom) / 2 / window.innerHeight;

    confetti({
        particleCount: 50,
        spread: 360,
        origin: { x, y }
    });

    const guessRow = createGuessRow(matchedExercise);
    document.getElementById('guesses-container').appendChild(guessRow);
    input.value = '';

    availableExercises = availableExercises.filter(exercise => exercise.toLowerCase() !== guess.toLowerCase());
    autocomplete(document.getElementById("exercise-input"), availableExercises);

    isAnimating = true;
    document.getElementById('submit-btn').disabled = true;
    animateReveal(guessRow, matchedExercise);

    increasePadding();
}

function increasePadding() {
    const currentPadding = parseInt(document.body.style.paddingBottom) || initialPadding;
    const newPadding = currentPadding + paddingIncrement;
    document.body.style.paddingBottom = `${newPadding}px`;
}

function animateReveal(guessRow, guess, isInstant = false) {
    const items = guessRow.querySelectorAll('.guess-item');
    let index = 1;

    function revealNext() {
        if (index < items.length) {
            const item = items[index];
            const category = Object.keys(exercises[guess])[index - 1];

            if (!isInstant) {
                item.classList.add('flipping');
            }
            setTimeout(() => {
                item.classList.add(exercises[guess][category] === exercises[targetExercise][category] ? 'correct' : 'incorrect');
                if (!isInstant) {
                    item.classList.remove('flipping');
                }
                item.querySelector('.hidden-text').classList.remove('hidden-text');
            }, isInstant ? 0 : 250);

            index++;
            setTimeout(revealNext, isInstant ? 0 : 500);
        } else {
            setTimeout(() => {
                const exerciseGuess = items[0];
                if (!isInstant) {
                    exerciseGuess.classList.add('flipping');
                }
                setTimeout(() => {
                    const isCorrect = guess.toLowerCase() === targetExercise.toLowerCase();
                    exerciseGuess.classList.add(isCorrect ? 'correct' : 'incorrect');
                    if (!isInstant) {
                        exerciseGuess.classList.remove('flipping');
                    }
                    exerciseGuess.querySelector('.hidden-text').classList.remove('hidden-text');

                    if (!isInstant) {
                        guessCount++;
                        updateRepsCounter(maxGuesses - guessCount);

                        setTimeout(() => {
                            if (isCorrect) {
                                displayMessage('Congratulations! You have guessed correctly!', 'success');
                                disableInput();
                                clearInterval(timerInterval);
                                if (isOneTimeLimit) {
                                    markPuzzleCompleted(true);
                                }
                                triggerSuccessConfetti();
                            } else if (guessCount >= maxGuesses) {
                                displayMessage(`Nice try! Better luck tomorrow!`, 'failure');
                                disableInput();
                                clearInterval(timerInterval);
                                if (isOneTimeLimit) {
                                    markPuzzleCompleted(false);
                                }
                            } else {
                                document.getElementById('submit-btn').disabled = false;
                                isAnimating = false;
                            }
                        }, 500);
                    }
                }, isInstant ? 0 : 250);
            }, isInstant ? 0 : 500);
        }
    }
    revealNext();
}

function displayMessage(message, type, completionTime) {
    const messageContainer = document.createElement('div');
    messageContainer.className = `message ${type}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';
    contentDiv.textContent = message;
    messageContainer.appendChild(contentDiv);

    const timeMessage = document.createElement('div');
    timeMessage.className = 'timer';

    let formattedTimeObject;
    if (completionTime) {
        formattedTimeObject = formatTime(completionTime);
    } else {
        const currentTime = new Date();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        formattedTimeObject = formatTime(elapsedTime);
        completionTime = markPuzzleCompleted();
    }

    timeMessage.textContent = `Your time: ${formattedTimeObject.formattedTime}${formattedTimeObject.emoji}`;
    messageContainer.appendChild(timeMessage);

    const guessesContainer = document.getElementById('guesses-container');
    if (guessesContainer) {
        guessesContainer.appendChild(messageContainer);
        requestAnimationFrame(() => {
            messageContainer.classList.add('visible');
        });
    }
    if (type === 'success') {
        const duration = .8 * 1000;
        const animationEnd = Date.now() + duration;

        (function frame() {
            if (Date.now() < animationEnd) {
                requestAnimationFrame(frame);
            }
        }());
    }
}

function formatTime(time) {
    const seconds = typeof time === 'string' ? parseInt(time, 10) : time;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    let formattedTime = '';
    let emoji = '';

    if (minutes > 0) {
        formattedTime = `${minutes} minute${minutes !== 1 ? 's' : ''} ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
    } else {
        formattedTime = `${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
    }

    if (seconds < 100) {
        emoji = ' 🔥';
    } else if (seconds > 300) {
        emoji = ' 🤮';
    } else {
        emoji = ' 🥱';
    }

    return { formattedTime, emoji };
}

function disableInput() {
    document.getElementById('exercise-input').disabled = true;
    document.getElementById('submit-btn').disabled = true;
}

function autocomplete(inp, arr) {
    let currentFocus;
    inp.addEventListener("input", function(e) {
        let a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.getElementById("autocomplete-list");
        for (i = 0; i < arr.length; i++) {
            if (arr[i].toUpperCase().includes(val.toUpperCase())) {
                b = document.createElement("LI");
                let startIndex = arr[i].toUpperCase().indexOf(val.toUpperCase());
                b.innerHTML = arr[i].substr(0, startIndex);
                b.innerHTML += "<strong>" + arr[i].substr(startIndex, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(startIndex + val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    inp.addEventListener("keydown", function(e) {
        let x = document.getElementById("autocomplete-list");
        if (x) x = x.getElementsByTagName("li");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            } else if (x && x.length > 0) {
                x[0].click();
            }
        }
    });
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
        inp.value = x[currentFocus].getElementsByTagName("input")[0].value;
    }
    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        let x = document.getElementById("autocomplete-list");
        if (x && elmnt != x && elmnt != inp) {
            x.innerHTML = "";
        }
    }
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}

document.getElementById('submit-btn').addEventListener('click', handleGuess);
document.getElementById('exercise-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && !isAnimating) {
        handleGuess();
    }
});

autocomplete(document.getElementById("exercise-input"), availableExercises);

document.addEventListener('DOMContentLoaded', () => {
    displayTodayDate();
    initGame();
});

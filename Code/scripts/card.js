const clock = document.getElementsByClassName('timer')[0];
const cardDiv = document.getElementsByClassName('personality-name')[0];
const cardsSpan = document.getElementsByClassName('cards-left-number')[0];
let teamsArray = JSON.parse(sessionStorage.getItem('teamsJSON'));
let cardsToPlay = JSON.parse(sessionStorage.getItem('activeDeck'));


let timer = 460 // 46 sec 
let interval;

function startCountDown() {
    interval = setInterval(() => {
        clock.textContent = `${Math.floor(timer / 10)}.${timer % 10}`;
        timer--;
        if (timer < 0) {
            clearInterval(interval);
            // round-description page will reshuffle cards, round continues with new player, leftover cards
            sessionStorage.setItem('deckAction', 'shuffle');
            sessionStorage.setItem('activeDeck', JSON.stringify(cardsToPlay));
            sessionStorage.setItem('teamsJSON', JSON.stringify(teamsArray));
            window.location.href = "times-up.html";
        }
    }, 100);
}


function addPointsToTeam() {
    let teamIndex = parseInt(sessionStorage.getItem('currentTeam'), 10);
    teamsArray[teamIndex].points++;
}


// ------------------- OK BUTTON -------------------
const positiveBtn = document.getElementsByClassName('yes-sign')[0];
positiveBtn.addEventListener('click', () => {
    // playSound('ok');
    cardsToPlay.shift();
    cardDiv.textContent = cardsToPlay[0];
    cardsSpan.textContent = `${cardsToPlay.length}`;
    addPointsToTeam();

    if (!cardsToPlay.length) {
        clearInterval(interval);
        const roundNumber = parseInt(sessionStorage.getItem('roundNumber'), 10);
        sessionStorage.setItem('roundNumber', `${roundNumber + 1}`);
        sessionStorage.setItem('deckAction', 'reset');
        sessionStorage.setItem('teamsJSON', JSON.stringify(teamsArray));
        window.location.href = "round-description.html";
    }


})

// ------------------- NOK BUTTON -------------------
const falseBtn = document.getElementsByClassName('no-sign')[0];
falseBtn.addEventListener('click', () => {
    // playSound('nok');
    cardsToPlay.push(cardsToPlay.shift());
    cardDiv.textContent = cardsToPlay[0];
})


// ------------------- INITIALISATION -------------------
function startPlayerRound() {
    cardDiv.textContent = cardsToPlay[0];
    cardsSpan.textContent = `${cardsToPlay.length}`;
    startCountDown();
}
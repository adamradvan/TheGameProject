let teamsArray = JSON.parse(sessionStorage.getItem('teamsJSON'));
let cardsToPlay = JSON.parse(sessionStorage.getItem('activeDeck'));


// REMOVE after tests and change in code to orig cardsToPlay
let copyOfActiveCards = [...cardsToPlay];
teamsArray[0].points = 0;

let timer = 460 // 46 sec 
let interval;


const clock = document.getElementsByClassName('timer')[0];
const cardDiv = document.getElementsByClassName('personality-name')[0];
const cardsSpan = document.getElementsByClassName('cards-left-number')[0];

console.log(sessionStorage);
console.log(cardsToPlay);




function startCountDown() {
    interval = setInterval(() => {
        clock.textContent = `${Math.floor(timer / 10)}.${timer % 10}`;
        timer--;
        if (timer < 0) {
            clearInterval(interval);
            // round-description page will reshuffle cards, round continues with new player, leftover cards
            sessionStorage.setItem('deckAction', 'shuffle');
            sessionStorage.setItem('teamsJSON', JSON.stringify(teamsArray));

            console.log('Session after time ran out:', sessionStorage);
            console.log('Will redirect to times-up.html');
            // window.location.href = "times-up.html";
        }
    }, 100);
}


function addPointsToTeam() {
    let teamIndex = parseInt(sessionStorage.getItem('currentTeam'), 10);
    teamsArray[teamIndex].points++;
    console.log('Increased points!', teamsArray[teamIndex]);
}


// ------------------- OK BUTTON -------------------
const positiveBtn = document.getElementsByClassName('yes-sign')[0];
positiveBtn.addEventListener('click', () => {
    // playSound('ok');
    copyOfActiveCards.shift();
    cardDiv.textContent = copyOfActiveCards[0];
    cardsSpan.textContent = `${copyOfActiveCards.length}`;
    addPointsToTeam();
    console.log('OK (remaining cards)', copyOfActiveCards);

    if (!copyOfActiveCards.length) {
        clearInterval(interval);
        const roundNumber = parseInt(sessionStorage.getItem('roundNumber'), 10);
        sessionStorage.setItem('roundNumber', `${roundNumber + 1}`);
        sessionStorage.setItem('deckAction', 'reset');
        sessionStorage.setItem('teamsJSON', JSON.stringify(teamsArray));
        console.log('Session after cards ran out:', sessionStorage);

        console.log('Will redirect to round-desc.html');
        // window.location.href = "round-description.html";
    }

})

// ------------------- NOK BUTTON -------------------
const falseBtn = document.getElementsByClassName('no-sign')[0];
falseBtn.addEventListener('click', () => {
    // playSound('nok');
    copyOfActiveCards.push(copyOfActiveCards.shift());
    cardDiv.textContent = copyOfActiveCards[0];
    console.log('NOK (remaining cards)', copyOfActiveCards);
})


function startPlayerRound() {
    cardDiv.textContent = copyOfActiveCards[0];
    cardsSpan.textContent = `${copyOfActiveCards.length}`;
    startCountDown();
}
/**
 * sessionStorage
 *
 * 'deckAction' -> 'reset' / 'shuffle'
 * 'roundNumber' -> '1' / '2' / '3' / '4'(Game over)
 * 'fullDeck' -> Array of Strings (names of all personalities)
 * 'activeDeck' -> Array of String (names of remaining personalities)
 * 'currPlayerName' -> String (name to be displayed on player-turn page)
 * 'currentTeam' -> Number from 0 to (number of teams - 1)
 * 'currentPlayer' -> '0' / '1'
 */
let teamsArray = JSON.parse(sessionStorage.getItem('teamsJSON'));
console.log(sessionStorage);


function createTeamPointsSection() {
    const teamSectionContainer = document.getElementsByClassName('team-points-section')[0];
    teamsArray.forEach(team => {
        let teamContainerDiv = document.createElement('div');
        let teamNumberSpan = document.createElement('span');
        let teamPointsSpan = document.createElement('span');
        teamContainerDiv.className = 'team-number-points-container';
        teamNumberSpan.className = 'team-number';
        teamPointsSpan.className = 'team-points';
        teamNumberSpan.innerHTML = `Team ${team.teamNumber}`;
        teamPointsSpan.innerHTML = `${team.points}`;
        teamContainerDiv.appendChild(teamNumberSpan);
        teamContainerDiv.appendChild(teamPointsSpan);
        teamSectionContainer.appendChild(teamContainerDiv);
    })
}

function insertRoundNumber() {
    if (!sessionStorage.getItem('roundNumber')) {
        console.log('No roundnumber in session storage, using num 1');
        sessionStorage.setItem('roundNumber', '1');
        document.getElementsByClassName('round-number')[0].textContent = `ROUND 2`;
    } else {
        const number = parseInt(sessionStorage.getItem('roundNumber'), 10);
        document.getElementsByClassName('round-number')[0].textContent = `ROUND ${number}`;
    }
}

function insertRoundExplanation() {
    const roundNum = parseInt(sessionStorage.getItem('roundNumber'), 10);
    let desc = document.getElementsByClassName('page-info-header')[0];
    switch (roundNum) {
        case 1: desc.textContent = 'EXPLAIN PERSONALITIES'; break;
        case 2: desc.textContent = '1-WORD-DESCRIPTION'; break;
        case 3: desc.textContent = 'IT\'S PANTOMIME TIME!'; break;
        default: desc.textContent = 'GAME IS DONE'; break;
    }
}

function initialiseRound() {
    insertRoundNumber();
    insertRoundExplanation();
    createTeamPointsSection();
    handleDeckAction();
}


function handleDeckAction() {
    const action = sessionStorage.getItem('deckAction');
    const teamIndex = parseInt(sessionStorage.getItem('currentTeam'), 10);
    const playerIndex = parseInt(sessionStorage.getItem('currentPlayer'), 10);

    if (!action || action === 'reset') {
        // reset players to begin a new round
        shuffleDeck(sessionStorage.getItem('fullDeck'));
        sessionStorage.setItem('currentPlayer', '0');
        sessionStorage.setItem('currentTeam', '0');
        sessionStorage.setItem('currPlayerName', teamsArray[0].players[0].name);
    } else if (action === 'shuffle') {
        console.log('Shuffle action');
        // time run out for player, round continues
        //      -> set acitve player to next player + shuffle deck of remaining cards

        // Not last team in rotation -> player with same index from next team is on move
        if (teamIndex + 1 < teamsArray.length) {
            console.log('Next team with same player index');
            shuffleDeck(sessionStorage.getItem('activeDeck'));
            sessionStorage.setItem('currentPlayer', `${playerIndex}`);
            sessionStorage.setItem('currentTeam', `${teamIndex + 1}`);
            sessionStorage.setItem('currPlayerName', teamsArray[teamIndex + 1].players[playerIndex].name);
        }
        // All players with same index from all teams played 
        //      -> start team index from 0 and change player index
        else {
            console.log('Reseting teams from 0, changing players indexes');
            shuffleDeck(sessionStorage.getItem('activeDeck'));
            sessionStorage.setItem('currentTeam', '0');
            if (playerIndex === 0) {
                sessionStorage.setItem('currentPlayer', '1');
                sessionStorage.setItem('currPlayerName', teamsArray[0].players[1].name);
            } else {
                sessionStorage.setItem('currentPlayer', '0');
                sessionStorage.setItem('currPlayerName', teamsArray[0].players[0].name);
            }
        }

    } else {
        alert('No deck action was stored!');
    }
}

// Shuffling algorithm (Fisher-Yates Shuffle) copied from stackoverflow
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleDeck(arrayJSON) {
    if (!arrayJSON) { alert('There is no deck in session to shuffle'); return; }

    let array = JSON.parse(arrayJSON);
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue; ``
    }

    sessionStorage.setItem('activeDeck', JSON.stringify(array));
}

const submitBtn = document.getElementsByClassName('submit-btn')[0];
submitBtn.addEventListener('click', () => {
    if (sessionStorage.getItem('roundNumber') === '4') {
        alert('Game is over, to start again, please open the game in new webbrowser tab');
    } else {
        window.location.href = "player-turn.html";
    }
})
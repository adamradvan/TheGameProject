console.log(JSON.parse(sessionStorage.getItem('teamsJSON')));
let teamsArray = JSON.parse(sessionStorage.getItem('teamsJSON'));
const currTeamIndex = parseInt(sessionStorage.getItem('currentTeam'), 10);
const currPlayerIndex = parseInt(sessionStorage.getItem('currentPlayer'), 10);
let currentPlayer = null;
let currPlayerPersonalities = [];

function initialiseCurrentPlayer() {
    currentPlayer = teamsArray[currTeamIndex].players[currPlayerIndex]
    currPlayerPersonalities = currentPlayer.personalities;

    // Insert name of current player into page
    let playerNameHeader = document.getElementsByClassName("player-name-header")[0];
    playerNameHeader.textContent = currentPlayer.name;
}

function redirectOrStartGame() {
    // 1st player, any team
    if (currPlayerIndex === 0) {
        sessionStorage.setItem('currentPlayer', '1');
        window.location.href = "personalities.html";
    }

    // 2nd player, not last team
    else if (currTeamIndex + 1 < teamsArray.length) {
        sessionStorage.setItem('currentPlayer', '0');
        sessionStorage.setItem('currentTeam', `${currTeamIndex + 1}`);
        window.location.href = "personalities.html";
    }
    else {
        // 2nd player, last team -> starting game
        // TODO: Redirect to round-description.html
        window.location.href = "#";
        console.log('Will redirect to RoundDescription.html, when finished');
    }
}

function saveDataToSessionStorage() {
    const personalityInputs = [...document.getElementsByClassName('personality-name-container')];
    personalityInputs.forEach(personality => {
        currPlayerPersonalities.push(personality);
    })

    console.log(teamsArray);
    sessionStorage.setItem('teamsJSON', JSON.stringify(teamsArray));
}

function checkValidPersonalityInputs() {
    const personalityInputs = [...document.getElementsByClassName('personality-name-container')];

    let missingInputValue = false;
    personalityInputs.forEach(input => {
        if (!input.value) {
            missingInputValue = true;
        }
    })

    if (missingInputValue) {
        alert('All personalities must be filled!');
        return false;
    }
    return true;
}


const submitBtn = document.getElementsByClassName('submit-btn')[0];
submitBtn.addEventListener('click', () => {
    if (checkValidPersonalityInputs()) {
        saveDataToSessionStorage();
        redirectOrStartGame();
    }
})
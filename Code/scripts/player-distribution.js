// Function that is called from HTML body onload
// Dynamically creates divs depending on data from sessionStorage, which is used on page before: 'team-count'
function createTeamContainers() {
    const teamCount = getTeamCount();
    const teamSectionContainer = document.getElementsByClassName('teams-section-container')[0];

    for (let i = 1; i < teamCount + 1; i++) {
        let teamContainerDiv = document.createElement('div');
        teamContainerDiv.className = 'team-container';

        let teamHeader = document.createElement('h2');
        teamHeader.className = 'team-number-header';
        teamHeader.innerHTML = `TEAM ${i}`;
        teamContainerDiv.appendChild(teamHeader);

        for (let j = 1; j <= 2; j++) {
            let playerNameInput = document.createElement('input');
            playerNameInput.className = `player-name-container player${j}`;
            playerNameInput.setAttribute('type', 'text');
            playerNameInput.setAttribute('name', `player-name-input${i}-${j}`);
            playerNameInput.setAttribute('id', `${i}-${j}`);
            playerNameInput.setAttribute('placeholder', 'Input player\'s name');
            playerNameInput.setAttribute('size', '15');
            playerNameInput.required = true;

            teamContainerDiv.appendChild(playerNameInput);
        }
        teamSectionContainer.appendChild(teamContainerDiv);
    }
}

function getTeamCount() {
    if (sessionStorage.getItem('teamCount') !== null) {
        return parseInt(sessionStorage.getItem('teamCount'), 10);
    } else {
        // Save default teamCount for future use in func saveDataToSessionStorage()
        sessionStorage.setItem('teamCount', '2');
        return 2;
    }
}

function checkValidNameInputs() {
    const playerNameInputs = [...document.getElementsByClassName('player-name-container')];
    playerNameInputs.forEach(input => {
        if (!input.value) {
            alert('All names must be filled!');
            return;
        }
    })
}

function saveDataToSessionStorage() {
    teamCount = parseInt(sessionStorage.getItem('teamCount'), 10);
    teamArray = [];
    for (let i = 1; i <= teamCount; i++) {
        let player1Name = document.getElementById(`${i}-${1}`).value;
        let player2Name = document.getElementById(`${i}-${2}`).value;
        teamObject = {
            "teamNumber": i,
            "players": [
                {
                    "name": player1Name,
                    "personalities": []
                },
                {
                    "name": player2Name,
                    "personalities": []
                }
            ],
            "points": 0,
            "lead": player1Name
        }
        teamArray.push(teamObject);
    }
    sessionStorage.setItem('teamsJSON', JSON.stringify(teamArray))
}

const submitBtn = document.getElementsByClassName('submit-btn')[0];
submitBtn.addEventListener('click', () => {
    checkValidNameInputs();
    saveDataToSessionStorage();
})
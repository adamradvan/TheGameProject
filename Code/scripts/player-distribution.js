

// Function that is called from HTML body onload
// Dynamically creates divs depending on data from sessionStorage, which is used on page before: 'team-count'
function createTeamContainers() {
    let teamCount = 2;

    if (sessionStorage.getItem('teamCount') !== null) {
        teamCount = parseInt(sessionStorage.getItem('teamCount'), 10);
    }

    const teamSectionContainer = document.getElementsByClassName('teams-section-container')[0];
    while (teamSectionContainer.firstChild) {
        teamSectionContainer.removeChild(teamSectionContainer.firstChild);
    }

    for (i = 1; i < teamCount + 1; i++) {
        let teamContainerDiv = document.createElement('div');
        teamContainerDiv.className = 'team-container';

        let teamHeader = document.createElement('h2');
        teamHeader.className = 'team-number-header';
        teamHeader.innerHTML = `TEAM ${i}`;
        teamContainerDiv.appendChild(teamHeader);

        for (j = 1; j < 3; j++) {
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

function checkValidNameInputs() {
    const playerNameInputs = [...document.getElementsByClassName('player-name-container')];
    playerNameInputs.forEach(input => {
        if (input.value) {
            console.log(input.value);
        } else {
            alert('All names must be filled!');
            return;
        }
    })
    // return true;
}

//  TODO: Check for valid input upon submit, add warning that all names have to be added
const submitBtn = document.getElementsByClassName('submit-btn')[0];
submitBtn.addEventListener('click', () => {
    checkValidNameInputs();
    console.log('All valid');
    // sessionStorage.setItem('teamCount', String(teamCountInputNode.value));
    // console.log('current teamcount in storage: ' + sessionStorage.getItem('teamCount'));

})
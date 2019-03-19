

// Function that is called from HTML body onload
// Dynamically creates divs depending on data from sessionStorage, which is used on page before: 'team-count'
function createTeamContainers() {

    if (sessionStorage.getItem('teamCount') === null) {
        teamCount = 2;
    } else {
        teamCount = sessionStorage.getItem('teamCount');
    }

    const teamSectionContainer = document.getElementsByClassName('teams-section-container')[0];

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
// TODO: Make a function for loading teams, add onload to HTML body
//       Check for valid input upon submit, add warnign that all names have to added
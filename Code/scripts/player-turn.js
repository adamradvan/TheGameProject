console.log(sessionStorage);



function insertPlayerName() {
    let playerDiv = document.getElementsByClassName('name-container')[0];
    if (!sessionStorage.getItem('currPlayerName')) {
        playerDiv.textContent = 'UNKNOWN PLAYER!';
    }
    else {
        playerDiv.textContent = `${sessionStorage.getItem('currPlayerName')}\'s TURN`;
    }
}

const submitBtn = document.getElementsByClassName('go-btn')[0];
submitBtn.addEventListener('click', () => {
    window.location.href = "card.html";
})
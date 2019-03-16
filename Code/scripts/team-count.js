/**
 * Session Storage:
 *      teamCount : number
 * 
 *      When clicked on Submit button, page stores 'teamCount', what is value of DOM Input Number Object
 *      Allowed range is <2,8>. Everything esle will be defaulted to either 2 or 8. 
 *      Depending on whether given number was beyond or above.
 */


const teamCountInputNode = document.getElementById('team-count-input');
const decrementBtn = document.getElementsByClassName('left')[0];
const incrementBtn = document.getElementsByClassName('right')[0];
const submitBtn = document.getElementsByClassName('submit-btn')[0];

decrementBtn.addEventListener('click', () => {
    if (teamCountInputNode.value > 2) {
        teamCountInputNode.stepDown();
        console.log(teamCountInputNode.value);
    }
})

incrementBtn.addEventListener('click', () => {
    if (teamCountInputNode.value < 8) {
        teamCountInputNode.stepUp();
        console.log(teamCountInputNode.value);
    }
})

submitBtn.addEventListener('click', () => {
    if (teamCountInputNode.value > 8) {
        teamCountInputNode.value = 8;
    }
    if (teamCountInputNode.value < 2) {
        teamCountInputNode.value = 2;
    }
    sessionStorage.setItem('teamCount', String(teamCountInputNode.value));
    console.log('current teamcount in storage: ' + sessionStorage.getItem('teamCount'));
    console.log('length: ' + sessionStorage.length);
})




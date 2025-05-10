//Object to tally score record
const tally = {
    ws: 0,
    ls: 0,
    ts: 0
};

const scoreDisplay = document.getElementById("scoreboard")
function updateDisplay(){
    scoreDisplay.textContent = `Wins: ${tally.ws}, Loses: ${tally.ls}, Ties: ${tally.ts}`
}
updateDisplay();

const map = {
    1: 'WINS',
    0: 'LOSES',
    null: 'TIES'
}

function playGame(move){
    const gen = Math.random();
    let compMove = null;
    let status = null;

    if(gen <= 1/3){
        compMove = 'rock';
    }
    else if(gen <= 2/3){
        compMove = 'paper';
    }
    else{
        compMove = 'scissors';
    }
    
    status = getresult(move,compMove);
    document.getElementById("moves").textContent = `Your move: ${move} ${map[status]} Computer move: ${compMove}`;
    updateScore(status);
}

// Dictionary to map win conditions
const winsAgainst = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
};

function getresult(m1,m2){
    if (m1 === m2) return null;
    if (winsAgainst[m1] === m2) return 1;
    return 0;
}

function updateScore(status){
    if(status){
        tally.ws += 1;
    }
    else if(status == null){
        tally.ts += 1;
    }
    else{
        tally.ls += 1;
    }
    updateDisplay();
}
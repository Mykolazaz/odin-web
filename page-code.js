function getComputerChoice() {
    const min = 0;
    const max = 2;
    let random = Math.floor(Math.random() * (max - min + 1) + min); // Generates 0, 1, or 2
    
    if (random === 0) {
        return "rock";
    } else if (random === 1) {
        return "paper";
    } else if (random === 2) {
        return "scissors";
    }
}

function getHumanChoice(){
    let textHuman = prompt("Please input (rock/paper/scissors): ");
    return textHuman;
}

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice){
    humanChoice = humanChoice.toLowerCase();
    
    if (humanChoice == computerChoice){
        return "Draw";
    }

    else if (humanChoice == "rock" && computerChoice == "scissors"){
        humanScore += 1;
        return "Human victory!";
    }

    else if (humanChoice == "paper" && computerChoice == "rock"){
        humanScore += 1;
        return "Human victory!";
    }

    else if (humanChoice == "scissors" && computerChoice == "paper"){
        humanScore += 1;
        return "Human victory!";
    }

    else{
        computerScore += 1;
        return "Computer victory!";
    }
}

function playGame(){
    for (let i=0;i<5;i++){
        let humanSelection = getHumanChoice();
        let computerSelection = getComputerChoice();
        console.log(playRound(humanSelection, computerSelection, "\n"));
        
    }

    if (humanScore > computerScore){
        console.log("HUMAN WINS!")
    } else console.log("COMPUTER WINS!")
}

playGame();
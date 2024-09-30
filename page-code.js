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


